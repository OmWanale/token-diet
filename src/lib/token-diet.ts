export const ORIGINAL_TOKENS = 10000;
export const BASE_TTFT = 4800;

export const ANSWER =
  "Candidates currently studying in the third year or higher of an undergraduate degree are eligible. There is no age restriction.";

export type Sentence = {
  id: number;
  text: string;
  kind: "relevant" | "redundant" | "irrelevant";
  score: number;
};

export const CONTEXT_SENTENCES: Sentence[] = [
  {
    id: 1,
    text: "Candidates currently studying in the third year or higher of any undergraduate degree program are eligible to appear for GATE.",
    kind: "relevant",
    score: 0.97,
  },
  {
    id: 2,
    text: "There is no age restriction for appearing in the GATE examination.",
    kind: "relevant",
    score: 0.94,
  },
  {
    id: 3,
    text: "Students in the third year or above of a bachelor's course may also apply, as stated in the earlier paragraph.",
    kind: "redundant",
    score: 0.41,
  },
  {
    id: 4,
    text: "The GATE brochure is printed by the organising institute and distributed to zonal offices every year.",
    kind: "irrelevant",
    score: 0.08,
  },
  {
    id: 5,
    text: "Candidates who have already completed a government-approved degree in Engineering, Technology, Science, Architecture or Commerce are also eligible.",
    kind: "relevant",
    score: 0.91,
  },
  {
    id: 6,
    text: "As mentioned above, no upper or lower age limit is enforced for candidates.",
    kind: "redundant",
    score: 0.37,
  },
];

export type Metrics = {
  level: number;
  compressed: number;
  saved: number;
  ttft: number;
  quality: number;
  similarity: number;
  preserved: string;
};

export function computeMetrics(level: number): Metrics {
  const compressed = Math.round((ORIGINAL_TOKENS * (100 - level)) / 100);
  const saved = ORIGINAL_TOKENS - compressed;
  // demo model: latency scales with tokens sent, plus fixed compression overhead
  const ttft = Math.round(900 + (compressed / ORIGINAL_TOKENS) * 4000);
  // quality holds up to ~70% then degrades sharply (demo curve)
  const quality =
    level <= 70
      ? Math.round(99 - (level / 70) * 3)
      : Math.round(96 - Math.pow((level - 70) / 20, 1.5) * 34);
  const similarity = Math.max(35, Math.min(99, quality));
  const preserved = quality >= 90 ? "High" : quality >= 75 ? "Medium" : "Low";
  return { level, compressed, saved, ttft, quality, similarity, preserved };
}

export const DEMO = computeMetrics(70);

export const format = (n: number) => n.toLocaleString("en-US");
