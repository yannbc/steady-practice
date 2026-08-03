# Handover prompts for Claude Code

Paste one of these as your first message after `cd`-ing into the repo.

Claude Code reads `CLAUDE.md` from the repo root automatically, so most of the context
loads without you doing anything. These prompts exist to do the part automatic loading
can't: **force orientation before action**, and pre-empt the specific ways this project
gets damaged.

---

## 1. General kickoff — use this every session

```
Before writing any code, do this in order:

1. Read CLAUDE.md and docs/DECISIONS.md in full.
2. Tell me, in under 150 words, what you understand the project's
   non-obvious constraints to be — the things that look like mistakes
   and aren't.
3. Then propose a plan for the task below. Do not start until I
   approve the plan.

Task: <describe it>

Guardrails I want you to hold to:
- Incremental edits against the existing structure. Do not rewrite
  or regenerate src/App.jsx wholesale.
- Never invent or estimate a video runtime, channel or title. Verify
  or omit.
- Do not soften the safety wording in any caution block. If you think
  one is wrong, say so and cite a reason — don't quietly rephrase it.
- No streaks, scores, or completion percentages.
- If a change makes something read more consistently but you can't
  tell whether the inconsistency was deliberate, ask me.

When you're done: build, publish gh-pages, load the live URL, confirm
the bundle actually changed, and exercise what you touched. A push to
main alone does not deploy this site.
```

**Why step 2 matters.** It's cheap, and it surfaces a cold read before that read turns
into commits. If the summary comes back thin, the reading didn't land, and you've learnt
that for the price of one exchange rather than one afternoon.

---

## 2. First real task — the voice feature

The natural first handoff: it's new infrastructure, you want to learn it, and it needs
you present.

```
Read CLAUDE.md, docs/DECISIONS.md and docs/VOICE-AND-RAG.md first, then
summarise the blocking constraint on this feature back to me before
proposing anything.

Goal: spoken cues during practice, so I'm not reading a screen mid-pose.

Decisions already made — treat as settled unless you have a concrete
reason to reopen, in which case argue it explicitly:
- Pre-rendered audio per stage, not live synthesis. The full corpus is
  ~25-30k characters, one time.
- No retrieval / RAG. The corpus is ~9,000 words and fits in context.
- Clip audio into short segments and let the app time the gaps. Do not
  bake silence into the files — hold durations should be a number to
  change, not audio to regenerate.

The constraint to solve first: this is a static site with no server, so
an API key in the bundle is public. Propose the smallest viable approach.
A token-minting service on Render is the expected direction; tell me if
you think something simpler works.

Start with one track only — Skandasana — so I can test it in a real
practice before we commit to all thirty stages.
```

---

## 3. Visual work — icons and diagrams

```
Read CLAUDE.md and docs/VISUAL-BRIEF.md first.

There are nine draft icons in src/assets/icons/, viewable via
design/icons.html. They are hand-authored SVG: fixed viewBox,
currentColor so they inherit theme colour, no embedded text. Keep those
properties in anything new.

Known weak: skandasana.svg is muddy at 16px, and squat.svg reads too
similarly to singleleg.svg. Redraw those two rather than starting over.

Do not integrate any icon into src/App.jsx until I've signed off on the
set visually.

Next after that: setup diagrams for the self-tests — knee-to-wall
measurement, and the overhead test with a rib-flare failure panel. These
depict apparatus and measurement, deliberately NOT body form. Read
docs/DECISIONS.md on why pose illustrations are advised against before
suggesting them.
```

---

## 4. If you want it to work on content

Highest-risk category — use the strictest framing.

```
Read CLAUDE.md, docs/DECISIONS.md and docs/EVIDENCE.md before anything.

You're editing content that is safety-bearing. Rules:
- Any change to a caution block, dosage figure, or contraindication
  needs a justification traceable to docs/EVIDENCE.md, and you must
  respect that file's confidence labels (well-supported / mixed /
  extrapolated). Don't upgrade a "mixed" claim to a confident one.
- Show me a diff of the exact wording before and after. No silent
  rephrasing.
- If you add a video, verify its title, channel and runtime against the
  live video and tell me how you verified. Estimates are not acceptable.

Task: <describe it>
```

---

## One thing worth saying out loud

`CLAUDE.md` and `DECISIONS.md` describe the project as it stands **today**. The moment
they drift from the code, they become actively harmful — confidently wrong context is
worse than none.

So: when a decision here is genuinely superseded, update `DECISIONS.md` in the same
commit. A good closing instruction for any substantial session:

```
If this change supersedes anything in docs/DECISIONS.md or CLAUDE.md,
update those files in the same commit and show me what changed.
```
