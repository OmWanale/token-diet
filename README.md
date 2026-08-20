# Token Diet Demo

Build a polished hackathon prototype for this problem statement:

Token-Diet Dynamic Context Compressor — Smart Context Compression for RAG

IMPORTANT: This is only a prototype/demo for hackathon selection. Do NOT build a real backend, authentication, cloud infrastructure, real vector database, or real LLM integration. Use local/mock data and frontend logic so the prototype works immediately.

Main concept

The prototype must demonstrate:

Normal RAG:
User Query → Retrieved Context → LLM → Answer

RAG + Token-Diet:
User Query → Retrieved Context → Token-Diet Compression → Compressed Context → LLM → Answer

The purpose is to show that retrieved context can be compressed before being sent to the LLM, reducing tokens and potentially reducing TTFT while maintaining answer quality.

UI

Create ONE main dashboard page with a premium modern AI/developer-tool design.

Use dark mode, clean typography, subtle gradients, cards, charts and professional animations.

Header:

Token-Diet
"Dynamic Context Compression for RAG"

Query section

Large input box with default example:

"What are the eligibility requirements for GATE?"

Button:

Run Comparison

When clicked, populate the dashboard with demo results.

Main comparison

Create two side-by-side cards.

NORMAL RAG

Show:

Retrieved Context:
10,000 tokens

Tokens sent to LLM:
10,000

TTFT:
4,800 ms

Answer:

"Candidates currently studying in the third year or higher of an undergraduate degree are eligible. There is no age restriction."

RAG + TOKEN-DIET

Show:

Retrieved Context:
10,000 tokens

Compressed Context:
3,000 tokens

Tokens Saved:
7,000

Compression:
70%

TTFT:
2,100 ms

Answer:

"Candidates currently studying in the third year or higher of an undergraduate degree are eligible. There is no age restriction."

Clearly label these as Prototype Simulation values.

Answer comparison

Below the two cards, show:

Answer Comparison

Display both answers and:

Similarity: 96%

Information preserved: High

Important information retained

Use a visual similarity/progress indicator.

Do not claim these are real benchmark results; label them as demo/prototype values.

Compression Lab

Add a section called:

Compression Lab

Add an interactive slider:

Compression Level: 70%

Range: 10%–90%.

When the slider moves, dynamically update:

Compressed tokens

Tokens saved

Compression percentage

Estimated TTFT

Answer quality

Use simple demo calculations/data.

For example, at 70%:

Original: 10,000
Compressed: 3,000
Saved: 7,000

At higher compression, show gradually lower answer-quality values to demonstrate the trade-off.

Context Visualizer

Show a small retrieved-context example divided into sentences.

Example:

🟢 Relevant sentence
🟢 Relevant sentence
🔴 Redundant sentence
🔴 Irrelevant sentence
🟢 Relevant sentence
🔴 Redundant sentence

Create a toggle:

Original | Compressed | Diff

The compressed view should show only the selected relevant sentences.

This should visually communicate that Token-Diet is selecting relevant information rather than simply cutting the text at a fixed character position.

Performance section

Create two simple charts:

Context Compression

Original tokens

Compressed tokens

TTFT Comparison

Normal RAG

Token-Diet RAG

Show:

Normal RAG: 4,800 ms
Token-Diet: 2,100 ms
Latency Drop: 2,700 ms

Clearly mark these as prototype simulation values.

Important

Keep everything on ONE dashboard page.

Do not create unnecessary pages or complex navigation.

Do not build real APIs or external services.

Use mock/local data only.

Make all interactions work immediately:

Run Comparison button

Compression slider

Original/Compressed/Diff toggle

Charts update when compression changes

The most important visual message should be:

10,000 retrieved tokens → Token-Diet → 3,000 relevant tokens → LLM

And show the trade-off:

More compression → fewer tokens → lower potential latency → eventually lower answer quality

Make the final result look like a convincing technical hackathon prototype, not a generic admin dashboard.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://token-diet.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b5090a9-2f1b-43fb-afa8-b5105c22d04e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
