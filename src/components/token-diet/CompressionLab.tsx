import { Slider } from "@/components/ui/slider";
import { format, ORIGINAL_TOKENS, type Result } from "@/lib/token-diet";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "primary" | "warn" | "bad";
}) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-4">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-2xl font-semibold tabular-nums",
          accent === "primary" && "text-primary",
          accent === "warn" && "text-tdamber",
          accent === "bad" && "text-tdred",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function CompressionLab({
  level,
  onLevel,
}: {
  level: number;
  onLevel: (v: number) => void;
}) {
  const m = computeMetrics(level);
  const qualityAccent = m.quality >= 90 ? "primary" : m.quality >= 75 ? "warn" : "bad";

  const tokenData = [
    { name: "Original", tokens: ORIGINAL_TOKENS, fill: "var(--muted-foreground)" },
    { name: "Compressed", tokens: m.compressed, fill: "var(--primary)" },
  ];
  const ttftData = [
    { name: "Normal RAG", ms: 4800, fill: "var(--chart-4)" },
    { name: "Token-Diet", ms: m.ttft, fill: "var(--primary)" },
  ];

  return (
    <section className="glass-card rounded-2xl p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold">Compression Lab</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag to explore the tokens ↔ latency ↔ quality trade-off. Prototype simulation values.
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Compression Level
          </p>
          <p className="font-display text-3xl font-bold text-gradient tabular-nums">{level}%</p>
        </div>
      </div>

      <div className="mt-6">
        <Slider
          value={[level]}
          min={10}
          max={90}
          step={5}
          onValueChange={(v) => onLevel(v[0]!)}
          className="py-2"
        />
        <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>10% · safest</span>
          <span>50%</span>
          <span>90% · aggressive</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Original" value={format(ORIGINAL_TOKENS)} />
        <Stat label="Compressed" value={format(m.compressed)} accent="primary" />
        <Stat label="Tokens Saved" value={format(m.saved)} accent="primary" />
        <Stat label="Est. TTFT" value={`${format(m.ttft)} ms`} />
        <Stat label="Answer Quality" value={`${m.quality}%`} accent={qualityAccent} />
      </div>

      {m.quality < 90 && (
        <p className="mt-4 rounded-lg border border-tdamber/40 bg-tdamber/10 px-4 py-2.5 text-sm text-tdamber">
          Trade-off zone: above ~70% compression the demo model starts dropping supporting
          evidence, and answer quality degrades.
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background/40 p-4">
          <h3 className="font-display text-sm font-semibold">Context Compression</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tokenData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "var(--secondary)", opacity: 0.4 }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Bar dataKey="tokens" radius={[8, 8, 0, 0]}>
                  {tokenData.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/40 p-4">
          <h3 className="font-display text-sm font-semibold">TTFT Comparison</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ttftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} unit="ms" />
                <Tooltip
                  cursor={{ fill: "var(--secondary)", opacity: 0.4 }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Bar dataKey="ms" radius={[8, 8, 0, 0]}>
                  {ttftData.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Latency drop: <span className="text-primary">{format(4800 - m.ttft)} ms</span> ·
            prototype simulation
          </p>
        </div>
      </div>
    </section>
  );
}
