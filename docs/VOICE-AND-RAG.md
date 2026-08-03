# Voice for Steady Practice — dispassionate assessment

> **Active assessment.** Whether to add voice guidance and retrieval-augmented Q&A.
> Conclusion: voice yes, retrieval no — the corpus is ~9,000 words and fits in context, so
> retrieval adds latency and a failure mode while buying nothing. Note the blocking
> constraint: this is a static site with no secret storage, so an API key in the bundle is
> public. Nothing here is built yet.

---

You asked one question, but it contains three products with very different value.
Splitting them is most of the answer.

| | What it is | Verdict |
|---|---|---|
| **1. Spoken cues** | Pre-generated audio per stage, played back | **Do it.** Solves the real problem, cheap, no ongoing cost |
| **2. Timed session player** | Cues + hold timing, fully hands-free | **The actual prize.** Build on top of 1 |
| **3. Live Q&A with RAG** | Ask questions mid-practice, generated answers | **Weakest.** And RAG is the wrong architecture — see below |

---

## The finding that matters: you don't need RAG

Measured against the real app, not in the abstract:

- **8,980 words** of prose content
- **65,625 characters** ≈ **16,400 tokens**
- 14 tracks, 30 stages

RAG exists to solve one problem: a corpus too large to fit in the model's context.
Yours fits several times over in a modern context window, with room to spare.

So retrieval buys you nothing here, and costs you three things:

1. **Infrastructure** — chunking, embedding, a vector store, a sync job whenever
   content changes.
2. **Latency** — a retrieval hop before the model can start speaking, in a setting
   where you're holding a position and waiting.
3. **A new failure mode that doesn't otherwise exist** — retrieving the wrong chunk.
   Ask about a knee twinge in Wheel and get back Crow's wrist caution. It will sound
   authoritative. This is the single most common failure in small-corpus RAG builds.

**Just put the whole corpus in the system prompt.** Same answers, no infrastructure,
no retrieval errors, lower latency. If the corpus grows past roughly 100k words — a
tenfold expansion — revisit.

This is worth knowing generally, not just here: RAG has become the default reflex for
"LLM plus my content", and for small corpora it is usually the wrong reflex. Learning
ElevenLabs is a great reason to build something; building retrieval you don't need is
a bad reason to add a database.

---

## Worked example A — a spoken cue, ready to paste

Real content, Skandasana Stage 1. This is what a cue actually looks like once it's
written for the ear instead of the eye.

**Segment 1 — `intro.mp3`** (~18s)

> Skandasana, stage one. Supported, with the heel raised.
> The point of this stage is to take balance out of the equation, so you find out
> what your real range is. Four holds each side, twenty to thirty seconds.
> Get a doorframe or a chair back within reach, and a stack of two or three books.

**Segment 2 — `setup.mp3`** (~22s)

> Step wide. Take hold of your support. Put the heel of the bending leg on the books.
> Bend that knee and lower to your limit — not past it.
> The other leg stays straight. Let that foot roll onto its heel if it wants to.

**Segment 3 — `hold.mp3`** (~4s)

> Lower now. Hold.

**Segment 4 — `release.mp3`** (~6s)

> And up. Shake it out. Other side when you're ready.

**Segment 5 — `caution.mp3`** — played once, before the first hold (~14s)

> One thing before you start. The inner thigh of the straight leg is the tissue at
> risk here. Sharp or sudden pain there is a stop, not a signal to push.

### The engineering choice that matters

**Do not bake the silence into the audio.** The instinct is to generate one long file
per stage with the pauses inside it. Don't.

Clip the audio into short segments and let the app time the gaps. Because:

- Hold durations change as you progress. Baked-in silence means regenerating audio
  every time; clipped segments mean changing a number.
- Files stay tiny — five clips of a few seconds each, versus a seven-minute track.
- You can pause, repeat a cue, or skip a side without scrubbing through audio.
- You regenerate only the segment whose text changed, not the whole session.

Layout that follows from that:

```
/audio/skandasana/1/intro.mp3
/audio/skandasana/1/setup.mp3
/audio/skandasana/1/hold.mp3
/audio/skandasana/1/release.mp3
/audio/skandasana/1/caution.mp3
```

Committed to `gh-pages` alongside the app. Static files, served free, work offline
once cached.

### Cost shape

Full pre-render of all 30 stages, at roughly the density above: **~25,000–30,000
characters**, one time. Regenerated only when content changes — and only the changed
segments. Worth checking ElevenLabs' current character allowances against that number,
but it is a small, bounded, predictable quantity, not a running meter.

---

## Worked example B — what the live version actually requires

Three real constraints, in order of hardness.

### 1. The API key cannot live in the app

Steady Practice is a static site on GitHub Pages. There is no backend. Anything in the
bundle is public — view source and the key is yours, spending against Yann's account.
This is a hard blocker, not a caution.

Two ways through:

- **Pre-rendered audio** sidesteps it completely. The key stays in the sandbox, never
  ships. This is another reason product 1 is the strong option.
- **A token-minting backend.** You already have two Render connections. A ~30-line
  service that holds the key and hands the browser a short-lived session token is the
  standard pattern, and Render is the obvious host.

### 2. Generated answers are unreviewed answers

The app's cautions were written deliberately, checked, and worded with care —
adductors tearing rather than lengthening, the disc-degeneration reasoning behind
the tripod recommendation, the hip morphology caveat.

A voice agent asked *"my knee is complaining, should I keep going?"* will answer. It
will sound calm and confident. That is the one moment where being wrong carries a
real cost, and it is precisely the moment a user is most likely to ask.

Mitigation is possible but must be deliberate:

- Constrain the agent to the corpus, with an explicit instruction to say *"that's not
  in the plan — stop and check with someone"* rather than reason from first principles.
- Hard-refuse on pain, injury and "should I push" questions, and route them to the
  written caution instead.
- Log every question asked. The transcript tells you what the written content is
  failing to explain — which is genuinely valuable regardless.

### 3. The weak link is voice *input*, not output

The failure mode people miss. You're in a deep side lunge, breathing hard, possibly
with music on. Now speak clearly enough for recognition, and break the hold to do it.

Voice output in that setting is reliable. Voice input is not. And the interruption is
not incidental — asking the question costs you the rep.

Which reframes the whole thing: most of the value you're after is **one-way**. And
most of the questions are predictable — *how long, which side, what should I feel,
is this pain or effort* — so they can be answered *inside the cue*, before you think
to ask.

---

## Recommendation

1. **Build the spoken cues.** Hands-free is the actual problem — you can't read a
   phone from dolphin. High value, bounded cost, no key exposure, no safety surface.
2. **Then the timed session player.** This is what turns the 30-day block from a page
   you consult into a session that runs itself. Genuinely good, and it needs nothing
   from a conversational agent.
3. **Add live Q&A only if a question keeps recurring that the cues don't answer.**
   Behind Render, corpus in the prompt, no vector store, hard refusals on pain.

The ordering isn't caution for its own sake. Each step is useful alone, and each one
teaches you the ElevenLabs surface you need for the next — voices and generation
first, then streaming and timing, then the conversational API. If the goal is to
learn the platform on something real, that's also the right order to learn it in.
