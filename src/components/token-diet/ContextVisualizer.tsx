import { useState } from "react";
import type { Result, ScoredSentence } from "@/lib/token-diet";
import { cn } from "@/lib/utils";

type Mode = "original" | "compressed" | "diff";

const modes: { id: Mode; label: string }[] = [
  { id: "original", label: "Original" },
  { id: "compressed", label: "Compressed" },
  { id: "diff", label: "Diff" },
];

function Row({ s, mode }: { s: ScoredSentence; mode: Mode }) {
  const kept = s.kept;
  const dropped = !kept && mode === "diff";
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-3 text-sm transition-all duration-300",
        kept ? "border-primary/35 bg-primary/8" : "border-destructive/35 bg-destructive/8",
        dropped && "line-through opacity-55",
      )}
    >
      <span
        className={cn(
          "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
          kept ? "bg-tdgreen shadow-[0_0_10px_currentColor]" : "bg-tdred",
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="leading-relaxed text-foreground/90">{s.text}</p>
        <div className="mt-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{s.kind}</span>
          <span className="text-border">•</span>
          <span>score {s.score.toFixed(2)}</span>
          {mode === "diff" && (
            <span className={kept ? "text-tdgreen" : "text-tdred"}>
              {kept ? "+ kept" : "− dropped"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContextVisualizer({ result }: { result: Result }) {
  const [mode, setMode] = useState<Mode>("original");
  const shown =
    mode === "compressed" ? result.sentences.filter((s) => s.kept) : result.sentences;

  const counts = result.sentences.reduce(
    (acc, s) => {
      acc[s.kind] += 1;
      return acc;
    },
    { relevant: 0, redundant: 0, irrelevant: 0 } as Record<string, number>,
  );

  return (
    <section className="glass-card rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold">Context Visualizer</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sentences ranked against your query — Token-Diet keeps the highest scoring spans, it
            does not truncate at a fixed position.
          </p>
        </div>
        <div className="flex rounded-xl border border-border bg-secondary/50 p-1">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition-all",
                mode === m.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {shown.map((s) => (
          <Row key={s.id} s={s} mode={mode} />
        ))}
      </div>

      <p className="mt-4 font-mono text-xs text-muted-foreground">
        {mode === "compressed"
          ? `${result.keptCount} of ${result.sentences.length} sentences retained • lowest-scoring spans removed`
          : `${result.sentences.length} sentences retrieved • ${counts.relevant} relevant • ${counts.redundant} redundant • ${counts.irrelevant} irrelevant`}
      </p>
    </section>
  );
}
