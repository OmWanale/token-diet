export const ORIGINAL_TOKENS = 10000;
export const BASE_TTFT = 4800;

export type SentenceKind = "relevant" | "redundant" | "irrelevant";

export type Sentence = {
  id: number;
  text: string;
  kind: SentenceKind;
  /** words that make this sentence relevant to a query */
  cues: string[];
};

export type Topic = {
  id: string;
  title: string;
  keywords: string[];
  sentences: Sentence[];
  normalAnswer: string;
  dietAnswer: string;
  /** answer produced when compression drops supporting evidence */
  degradedAnswer: string;
};

const s = (
  id: number,
  text: string,
  kind: SentenceKind,
  cues: string[] = [],
): Sentence => ({ id, text, kind, cues });

export const TOPICS: Topic[] = [
  {
    id: "gate-eligibility",
    title: "GATE Eligibility",
    keywords: [
      "gate",
      "eligibility",
      "eligible",
      "criteria",
      "age",
      "qualification",
      "apply",
      "who",
    ],
    sentences: [
      s(1, "Candidates currently studying in the third year or higher of any undergraduate degree program are eligible to appear for GATE.", "relevant", ["eligibility", "eligible", "criteria", "who", "apply"]),
      s(2, "There is no age restriction for appearing in the GATE examination.", "relevant", ["age", "eligibility", "restriction"]),
      s(3, "Candidates who have already completed a government-approved degree in Engineering, Technology, Science, Architecture or Commerce are also eligible.", "relevant", ["eligibility", "degree", "qualification"]),
      s(4, "Students in the third year or above of a bachelor's course may also apply, as stated in the earlier paragraph.", "redundant", ["eligibility"]),
      s(5, "As mentioned above, no upper or lower age limit is enforced for candidates.", "redundant", ["age"]),
      s(6, "GATE is conducted once every year by one of the organising IITs or IISc.", "irrelevant", ["exam", "conducted"]),
      s(7, "The GATE brochure is printed by the organising institute and distributed to zonal offices every year.", "irrelevant", []),
    ],
    normalAnswer:
      "Candidates currently studying in the third year or higher of an undergraduate degree are eligible for GATE, and those who have already completed an approved degree in Engineering, Technology, Science, Architecture or Commerce may also apply. There is no age restriction.",
    dietAnswer:
      "Students in the third year or above of an undergraduate degree are eligible, as are candidates who already hold an approved degree in Engineering, Technology, Science, Architecture or Commerce. No age limit applies.",
    degradedAnswer:
      "Third-year and higher undergraduate students are eligible for GATE. (Supporting details on completed degrees and the age rule were dropped by aggressive compression.)",
  },
  {
    id: "gate-exam",
    title: "GATE Examination",
    keywords: ["gate", "exam", "examination", "pattern", "paper", "marks", "syllabus", "score", "conducted"],
    sentences: [
      s(1, "GATE is a national-level computer-based test that assesses comprehensive understanding of undergraduate engineering and science subjects.", "relevant", ["exam", "examination", "what"]),
      s(2, "The paper runs for three hours and contains 65 questions worth a total of 100 marks, including multiple-choice, multiple-select and numerical answer type questions.", "relevant", ["pattern", "paper", "marks", "questions"]),
      s(3, "The GATE score is valid for three years and is used for postgraduate admissions and PSU recruitment.", "relevant", ["score", "validity", "admission"]),
      s(4, "The examination is conducted every year by the organising institute.", "redundant", ["conducted"]),
      s(5, "The test is held annually across many cities, as also noted earlier.", "redundant", ["conducted"]),
      s(6, "Candidate photographs must follow the specified pixel dimensions during application upload.", "irrelevant", []),
    ],
    normalAnswer:
      "GATE is a national-level computer-based examination on undergraduate engineering and science subjects. The three-hour paper has 65 questions for 100 marks across multiple-choice, multiple-select and numerical types, and the resulting score is valid for three years for PG admissions and PSU recruitment.",
    dietAnswer:
      "GATE is a national computer-based test covering undergraduate engineering and science. It is a three-hour, 65-question, 100-mark paper, and the score stays valid for three years for postgraduate admissions and PSU hiring.",
    degradedAnswer:
      "GATE is a national-level computer-based examination in engineering and science subjects. (Paper pattern and score-validity details were lost at this compression level.)",
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation",
    keywords: ["rag", "retrieval", "augmented", "generation", "vector", "embedding", "grounding", "context"],
    sentences: [
      s(1, "Retrieval-Augmented Generation (RAG) combines a retriever over an external knowledge base with a generative language model so answers are grounded in real documents.", "relevant", ["rag", "what", "retrieval", "generation"]),
      s(2, "The user query is embedded into a vector, similar chunks are fetched from a vector store, and those chunks are placed into the model prompt as context.", "relevant", ["vector", "embedding", "how", "context"]),
      s(3, "RAG reduces hallucination and lets a model use fresh or private data without retraining.", "relevant", ["why", "benefit", "hallucination"]),
      s(4, "In other words, retrieval is paired with generation to ground the output.", "redundant", ["rag"]),
      s(5, "As already described, relevant chunks are added to the prompt before generation.", "redundant", ["context"]),
      s(6, "Vector databases are usually deployed on managed cloud infrastructure with autoscaling node pools.", "irrelevant", []),
    ],
    normalAnswer:
      "RAG (Retrieval-Augmented Generation) pairs a retriever over an external knowledge base with a generative model. The query is embedded, similar chunks are pulled from a vector store and injected into the prompt, so the model answers from real documents — reducing hallucination and allowing fresh or private data without retraining.",
    dietAnswer:
      "RAG grounds a language model in retrieved documents: the query is embedded, matching chunks come back from a vector store and are added to the prompt. This cuts hallucination and lets the model use fresh or private data without retraining.",
    degradedAnswer:
      "RAG combines retrieval with a generative model so answers come from external documents. (The retrieval pipeline and benefit details were dropped at this compression level.)",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    keywords: ["artificial", "intelligence", "ai", "machine", "learning", "neural", "model", "deep"],
    sentences: [
      s(1, "Artificial Intelligence is the field of building systems that perform tasks normally requiring human intelligence, such as perception, reasoning, language and decision making.", "relevant", ["ai", "intelligence", "what"]),
      s(2, "Machine learning is the dominant modern approach: models learn statistical patterns from data instead of following hand-written rules.", "relevant", ["machine", "learning", "how"]),
      s(3, "Deep learning uses multi-layer neural networks and powers today's vision, speech and large language models.", "relevant", ["deep", "neural", "model"]),
      s(4, "Put differently, AI systems try to imitate human-like intelligent behaviour.", "redundant", ["ai"]),
      s(5, "As stated earlier, learning from data is central to modern AI.", "redundant", ["learning"]),
      s(6, "The term was popularised at a summer workshop held at Dartmouth College in 1956.", "irrelevant", []),
    ],
    normalAnswer:
      "Artificial Intelligence is the field of building systems that perform tasks normally requiring human intelligence — perception, reasoning, language and decision making. Machine learning dominates modern AI, with models learning patterns from data, and deep learning with multi-layer neural networks powers today's vision, speech and large language models.",
    dietAnswer:
      "AI builds systems that handle tasks needing human-like intelligence such as perception, reasoning and language. Modern AI is driven by machine learning — models learning from data — and by deep neural networks behind vision, speech and LLMs.",
    degradedAnswer:
      "Artificial Intelligence is about systems that perform tasks requiring human intelligence. (Machine-learning and deep-learning specifics were dropped at this compression level.)",
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    keywords: ["cloud", "computing", "iaas", "paas", "saas", "aws", "azure", "serverless", "scaling"],
    sentences: [
      s(1, "Cloud computing is the on-demand delivery of computing resources — servers, storage, databases and networking — over the internet with pay-as-you-go pricing.", "relevant", ["cloud", "computing", "what"]),
      s(2, "The main service models are IaaS, PaaS and SaaS, and deployments can be public, private or hybrid.", "relevant", ["iaas", "paas", "saas", "models"]),
      s(3, "Key benefits are elasticity, no upfront hardware cost and the ability to scale capacity up or down within minutes.", "relevant", ["scaling", "benefit", "why"]),
      s(4, "In short, computing capacity is rented over the network rather than owned.", "redundant", ["cloud"]),
      s(5, "As mentioned above, resources can be provisioned on demand.", "redundant", ["computing"]),
      s(6, "Many providers publish quarterly sustainability reports about their data centre operations.", "irrelevant", []),
    ],
    normalAnswer:
      "Cloud computing delivers computing resources — servers, storage, databases and networking — on demand over the internet with pay-as-you-go pricing. It is offered as IaaS, PaaS and SaaS across public, private or hybrid deployments, giving elasticity, no upfront hardware cost and scaling within minutes.",
    dietAnswer:
      "Cloud computing rents computing resources such as servers, storage and databases on demand over the internet, billed per use. It comes as IaaS, PaaS or SaaS in public, private or hybrid form, offering elasticity and fast scaling with no upfront hardware.",
    degradedAnswer:
      "Cloud computing is on-demand delivery of computing resources over the internet. (Service models and benefit details were dropped at this compression level.)",
  },
  {
    id: "networks",
    title: "Computer Networks",
    keywords: ["network", "networks", "networking", "tcp", "ip", "osi", "protocol", "router", "packet", "lan"],
    sentences: [
      s(1, "A computer network is a set of interconnected devices that exchange data using agreed communication protocols.", "relevant", ["network", "what"]),
      s(2, "The OSI model describes seven layers, while the practical TCP/IP stack uses four: link, internet, transport and application.", "relevant", ["osi", "tcp", "ip", "layers", "protocol"]),
      s(3, "TCP provides reliable ordered delivery, whereas UDP is connectionless and favours low latency; routers forward packets between networks using IP addresses.", "relevant", ["tcp", "packet", "router", "protocol"]),
      s(4, "Simply put, networked machines talk to each other over shared links.", "redundant", ["network"]),
      s(5, "As noted before, protocols define the rules of communication.", "redundant", ["protocol"]),
      s(6, "Structured cabling in office buildings is usually installed by third-party contractors.", "irrelevant", []),
    ],
    normalAnswer:
      "A computer network connects devices that exchange data using shared protocols. The OSI model defines seven layers and the practical TCP/IP stack four — link, internet, transport and application. TCP gives reliable ordered delivery while UDP is connectionless and low-latency, and routers forward packets between networks using IP addresses.",
    dietAnswer:
      "A computer network is interconnected devices exchanging data over agreed protocols. It is layered — seven layers in OSI, four in TCP/IP — with TCP providing reliable delivery, UDP low-latency delivery, and routers forwarding packets by IP address.",
    degradedAnswer:
      "A computer network is a set of connected devices exchanging data using protocols. (Layer model and transport-protocol details were dropped at this compression level.)",
  },
  {
    id: "dbms",
    title: "Database Management",
    keywords: ["database", "dbms", "sql", "acid", "normalization", "transaction", "index", "relational", "query"],
    sentences: [
      s(1, "A database management system is software that stores, retrieves and manages structured data while enforcing integrity and access control.", "relevant", ["database", "dbms", "what"]),
      s(2, "Relational systems organise data into tables queried with SQL, and transactions follow the ACID properties: atomicity, consistency, isolation and durability.", "relevant", ["sql", "acid", "relational", "transaction"]),
      s(3, "Normalization removes redundancy across tables, while indexes speed up lookups at the cost of extra write overhead.", "relevant", ["normalization", "index", "query"]),
      s(4, "In other words, a DBMS is the layer that manages stored data for applications.", "redundant", ["database"]),
      s(5, "As already mentioned, data integrity is enforced by the system.", "redundant", ["dbms"]),
      s(6, "Database administrators often rotate on-call shifts across time zones.", "irrelevant", []),
    ],
    normalAnswer:
      "A database management system stores, retrieves and manages structured data while enforcing integrity and access control. Relational systems keep data in tables queried with SQL and run transactions under the ACID properties, with normalization removing redundancy and indexes speeding up lookups at some write cost.",
    dietAnswer:
      "A DBMS manages structured data with integrity and access control. Relational databases use SQL tables and ACID transactions; normalization reduces redundancy and indexes accelerate reads while adding write overhead.",
    degradedAnswer:
      "A database management system stores and manages structured data for applications. (SQL/ACID and normalization details were dropped at this compression level.)",
  },
];

const STOP = new Set([
  "what","is","are","the","a","an","of","for","to","in","on","how","does","do","and","or","with","about","me","tell","explain","can","you","which","who","why","between","by","it","this","that","requirements","define",
]);

export const tokenize = (q: string): string[] =>
  q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));

export function matchTopic(query: string): { topic: Topic; score: number } | null {
  const words = tokenize(query);
  if (words.length === 0) return null;
  let best: { topic: Topic; score: number } | null = null;
  for (const topic of TOPICS) {
    let score = 0;
    for (const w of words) {
      for (const k of topic.keywords) {
        if (k === w) score += 2;
        else if (k.startsWith(w) || w.startsWith(k)) score += 1;
      }
    }
    // slight boost when several distinct keywords hit
    if (!best || score > best.score) best = { topic, score };
  }
  if (!best || best.score < 2) return null;
  return best;
}

export type ScoredSentence = Sentence & { score: number; kept: boolean };

export type Result = {
  topic: Topic;
  sentences: ScoredSentence[];
  keptCount: number;
  compressed: number;
  saved: number;
  ratio: number;
  ttft: number;
  quality: number;
  similarity: number;
  preserved: string;
  answer: string;
  degraded: boolean;
};

function scoreSentence(sen: Sentence, words: string[]): number {
  const base = sen.kind === "relevant" ? 0.62 : sen.kind === "redundant" ? 0.3 : 0.06;
  let hits = 0;
  const text = sen.text.toLowerCase();
  for (const w of words) {
    if (sen.cues.includes(w)) hits += 2;
    else if (text.includes(w)) hits += 1;
  }
  const boost = Math.min(0.35, hits * 0.07);
  return Math.min(0.99, Number((base + boost).toFixed(2)));
}

/** Relevance-ranked selection under a token budget — never a prefix cut. */
export function analyze(query: string, topic: Topic, level: number): Result {
  const words = tokenize(query);
  const scored = topic.sentences
    .map((sen) => ({ ...sen, score: scoreSentence(sen, words), kept: false }))
    .sort((a, b) => b.score - a.score);

  const compressed = Math.round((ORIGINAL_TOKENS * (100 - level)) / 100);
  const total = scored.reduce((n, s2) => n + s2.score, 0);
  const budget = (compressed / ORIGINAL_TOKENS) * total * 1.35;

  let used = 0;
  for (const sen of scored) {
    if (used + sen.score <= budget || used === 0) {
      sen.kept = true;
      used += sen.score;
    }
  }

  const relevantTotal = topic.sentences.filter((s2) => s2.kind === "relevant").length;
  const relevantKept = scored.filter((s2) => s2.kept && s2.kind === "relevant").length;
  const coverage = relevantTotal ? relevantKept / relevantTotal : 1;

  const quality = Math.max(38, Math.round(72 + coverage * 27 - Math.max(0, level - 80) * 0.4));
  const similarity = Math.max(35, Math.min(99, quality));
  const ttft = Math.round(900 + (compressed / ORIGINAL_TOKENS) * 4000);
  const degraded = coverage < 0.99;

  return {
    topic,
    sentences: scored,
    keptCount: scored.filter((s2) => s2.kept).length,
    compressed,
    saved: ORIGINAL_TOKENS - compressed,
    ratio: level,
    ttft,
    quality,
    similarity,
    preserved: quality >= 90 ? "High" : quality >= 75 ? "Medium" : "Low",
    answer: degraded ? topic.degradedAnswer : topic.dietAnswer,
    degraded,
  };
}

export const NO_MATCH_ANSWER =
  "Prototype knowledge base does not contain enough information for this question.";
export const NO_MATCH_HINT =
  "Connect a real vector database + LLM backend for unrestricted questions.";

export const format = (n: number) => n.toLocaleString("en-US");
