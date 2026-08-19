import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Cpu, Database, Gauge, Play, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CompressionLab } from "@/components/token-diet/CompressionLab";
import { ContextVisualizer } from "@/components/token-diet/ContextVisualizer";
import { ANSWER, computeMetrics, format, ORIGINAL_TOKENS } from "@/lib/token-diet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Token-Diet — Dynamic Context Compression for RAG" },
      {
        name: "description",
        content:
          "Interactive prototype showing how compressing retrieved RAG context cuts tokens and TTFT while preserving answer quality.",
      },
      { property: "og:title", content: "Token-Diet — Dynamic Context Compression for RAG" },
      {
        property: "og:description",
        content: "Normal RAG vs RAG + Token-Diet: 10,000 tokens → 3,000 tokens → LLM.",
      },
    ],
  }),
  component: Dashboard,
});

const DEMO = computeMetrics(70);

function Metric({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "primary" | "bad";
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-2xl font-semibold tabular-nums",
          tone === "primary" && "text-primary",
          tone === "bad" && "text-tdred",
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function PipelineStep({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
      <span className="text-primary">{icon}</span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="font-display text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const [query, setQuery] = useState("What are the eligibility requirements for GATE?");
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);
  const [level, setLevel] = useState(70);

  const run = () => {
    setRunning(true);
    setRan(false);
    window.setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 700);
  };

  return (
    <main className="min-h-screen grid-bg">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
        {/* Header */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
            <Sparkles className="h-3 w-3" /> Prototype Simulation
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-6xl">
            <span className="text-gradient">Token-Diet</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Dynamic Context Compression for RAG
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PipelineStep icon={<Database className="h-4 w-4" />} label="Retrieved" value="10,000 tokens" />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <PipelineStep icon={<Zap className="h-4 w-4" />} label="Token-Diet" value="Compression" />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <PipelineStep icon={<Gauge className="h-4 w-4" />} label="Compressed" value="3,000 tokens" />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <PipelineStep icon={<Cpu className="h-4 w-4" />} label="Sent to" value="LLM" />
          </div>
        </header>

        {/* Query */}
        <section className="glass-card mt-12 rounded-2xl p-6">
          <label
            htmlFor="query"
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
          >
            User Query
          </label>
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={2}
            className="mt-2 resize-none border-border bg-background/60 font-mono text-base"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Runs against a local mock corpus — no external API calls.
            </p>
            <Button size="lg" onClick={run} disabled={running} className="gap-2 font-semibold">
              <Play className={cn("h-4 w-4", running && "animate-pulse")} />
              {running ? "Compressing context…" : "Run Comparison"}
            </Button>
          </div>
        </section>

        {!ran && !running && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Press <span className="text-primary">Run Comparison</span> to populate the dashboard.
          </p>
        )}

        {ran && (
          <div className="mt-10 space-y-10 duration-500 animate-in fade-in slide-in-from-bottom-4">
            {/* Comparison */}
            <section className="grid gap-6 lg:grid-cols-2">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold">Normal RAG</h2>
                  <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                    baseline
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Metric label="Retrieved Context" value={`${format(ORIGINAL_TOKENS)} tokens`} />
                  <Metric label="Tokens sent to LLM" value={format(ORIGINAL_TOKENS)} tone="bad" />
                  <Metric label="TTFT" value="4,800 ms" tone="bad" />
                  <Metric label="Compression" value="0%" />
                </div>
                <div className="mt-5 rounded-xl border border-border bg-background/40 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Answer
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{ANSWER}</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 ring-1 ring-primary/30">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold">
                    RAG + <span className="text-gradient">Token-Diet</span>
                  </h2>
                  <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase text-primary">
                    optimized
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Metric label="Retrieved Context" value={`${format(ORIGINAL_TOKENS)} tokens`} />
                  <Metric label="Compressed Context" value="3,000" tone="primary" />
                  <Metric label="Tokens Saved" value="7,000" tone="primary" />
                  <Metric label="Compression" value="70%" tone="primary" />
                  <Metric label="TTFT" value="2,100 ms" tone="primary" />
                  <Metric label="Tokens sent to LLM" value="3,000" tone="primary" />
                </div>
                <div className="mt-5 rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Answer
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{ANSWER}</p>
                </div>
              </div>
            </section>

            <p className="text-center font-mono text-xs text-muted-foreground">
              All figures above are prototype simulation values — not real benchmark results.
            </p>

            {/* Answer comparison */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-xl font-semibold">Answer Comparison</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {["Normal RAG", "Token-Diet RAG"].map((t, i) => (
                  <div
                    key={t}
                    className={cn(
                      "rounded-xl border p-4",
                      i === 0 ? "border-border bg-background/40" : "border-primary/30 bg-primary/5",
                    )}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {t}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">{ANSWER}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Similarity</span>
                  <span className="font-display font-semibold text-primary tabular-nums">96%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: "96%", background: "var(--gradient-primary)" }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs text-primary">
                    Information preserved: High
                  </span>
                  <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs text-primary">
                    Important information retained
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    Demo values
                  </span>
                </div>
              </div>
            </section>

            <CompressionLab level={level} onLevel={setLevel} />
            <ContextVisualizer />

            {/* Performance summary */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-xl font-semibold">Performance Summary</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Metric label="Normal RAG TTFT" value="4,800 ms" tone="bad" />
                <Metric label="Token-Diet TTFT" value={`${format(DEMO.ttft)} ms`} tone="primary" />
                <Metric label="Latency Drop" value="2,700 ms" tone="primary" sub="at 70% compression" />
              </div>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                Prototype simulation values · mock retrieval corpus · no LLM was called.
              </p>
            </section>
          </div>
        )}

        <footer className="mt-16 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Token-Diet · hackathon prototype · local mock data only
        </footer>
      </div>
    </main>
  );
}
