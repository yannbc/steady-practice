# CLAUDE.md

Project context for Claude Code. Read this before touching anything.

## What this is

A skill-focused yoga launcher. Vite + React, single-page, no backend. Nine skill
tracks with staged progressions, cues and vetted videos, plus a dated 30-day training
block.

**All content lives in the `TRACKS` array in `src/App.jsx`** (~2,340 lines: data, UI
and styles in one file). That's deliberate — see `docs/DECISIONS.md` §5.

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
```

## Read this first

**[`docs/DECISIONS.md`](docs/DECISIONS.md) is required reading.** It records what not
to undo. This project contains several things that look like inconsistencies,
redundancy, or overcaution, and are not — each is the result of a specific check.

The failure mode this repo is most exposed to: a capable agent tidies up four or five
of those, the diff looks like housekeeping, and nobody notices what was lost. If you
change anything in the list below, check that file first.

## Rules

**1. Do not rewrite the app.** Work incrementally against the existing structure. This
codebase accumulated verified video metadata, six clinically-framed safety cautions, 18
stage alternatives, and the plan view's taper and spacing logic. A rewrite silently
mangles some of that. Assets, isolated components and scoped edits — yes. Wholesale
regeneration — no.

**2. Never invent video metadata.** Runtime, channel and title must be checked against
the live video or left out. An earlier version of this app had 8 of 10 durations wrong,
one by a factor of seven, and 6 of 10 channels reading "Tutorial". Duration is how a
user decides whether a session fits the time they have. A guessed runtime is worse than
no runtime.

**3. Safety wording is load-bearing.** Six tracks carry `caution` blocks — Deep Squat,
Skandasana, Overhead & Thoracic, Tripod & Crow, Wheel, Handstand. Specific phrasings
encode specific reasoning: adductors *tear* rather than *tighten*; tripod routes toward
forearms rather than head loading; handstand's contraindications are categorical, not
graded. Do not soften these into generic "listen to your body" language, and do not
merge the absolute contraindications into the general advice. Cautions render *above*
the progression on purpose.

**4. Don't restore the tidier dependency chain.** Ankle mobility does **not** feed
dolphin, wheel or handstand. Those arrows existed, contradicted the app's own text, and
were removed. Details in `DECISIONS.md` §3.

**5. Don't add streaks, scores or completion percentages.** The absence is a design
decision, not an oversight. The two-week strip shows the *spacing* of hard sessions.
The plan depends on a rest day that gamification would fight.

**6. Ask before generalising the 30-day block.** The nine tracks are general. The block
is not — its frequencies and "at 49" framing assume one specific user. Generalising it
means redoing the dosage reasoning, not parameterising the dates.

## Deployment — read before you debug a "broken deploy"

**There is no CI build.** `.github/workflows/deploy.yml` exists but the workflow is not
what publishes the site. GitHub Pages serves a **prebuilt `gh-pages` branch**: source
on `main`, built `dist/` pushed to `gh-pages` directly.

**So a push to `main` does not update the live site.** You must build and publish
`gh-pages`. The most common false alarm on this project is concluding a deploy failed
when it simply hadn't been rebuilt — or when a CDN was serving a stale bundle. Check
the published bundle hash before assuming breakage.

`vite.config.js` sets `base` for a project page — the site is served from
`/steady-practice/`, not a domain root. Changing `base` breaks every asset path.

Live: https://yannbc.github.io/steady-practice/

## No secrets, no server

The app is fully static. **Any API key in the bundle is public** and will spend the
owner's quota. This blocks the naive version of any paid-API feature (text-to-speech,
LLM Q&A) until a token-minting service exists elsewhere. It is a wall, not a caution.

All state is `localStorage` — `steady-practice-progress` (per-track stage) plus a plan
key (block dates, baseline, session log). No accounts, no sync. The export/import
transfer code exists because of that, and validates aggressively: out-of-range stages,
unknown session types, malformed dates and oversized payloads are discarded. **Keep
that validation**, and keep older codes loading.

## Document map

| File | What it holds |
|---|---|
| `docs/DECISIONS.md` | **Read first.** What not to undo, and why |
| `docs/CONTENT.md` | How to edit tracks, stages, cautions, dosage, alternates |
| `docs/DEPLOYMENT.md` | Hosting options and `base` path notes |
| `docs/EVIDENCE.md` | Research brief with citations, graded by confidence |
| `docs/CONTENT-REVIEW.md` | Audit that produced the metadata and dependency fixes |
| `docs/UX-REVIEW.md` | Usability findings, including which remain open |
| `docs/VISUAL-BRIEF.md` | Palette, type, icon and diagram constraints |
| `docs/VOICE-AND-RAG.md` | Why voice yes, retrieval no, and the blocking constraint |

The reviews are historical records. Some findings in them are already fixed — the
metadata corrections and dependency-chain cuts are live. `DECISIONS.md` reflects the
current state; the reviews explain how it got there.

## In flight

**Nine track icons, drafted and unintegrated.** `src/assets/icons/*.svg`, previewed via
`design/icons.html` and `design/icons-preview.png`. Hand-authored vector: fixed
viewBox, `currentColor` so they inherit theme colour, no embedded text. Not wired into
the app and **awaiting the owner's review** — Skandasana and Deep Squat are known weak,
and Squat reads too similarly to Single-Leg Rise. Don't integrate them until he's
signed off. The app currently uses arbitrary Unicode glyphs as placeholders.

**Setup diagrams** — the higher-value visual work, not started. Knee-to-wall
measurement, and the overhead test with its rib-flare failure panel. Deliberately
*apparatus and measurement*, not body form.

**Pose illustrations are advised against.** Joint angles *are* the instruction here,
and a drawing that's 80% right is worse than text because people copy pictures and skim
words. A tripod illustration showing head loading would contradict the caution three
lines above it.

**Deferred with the owner's knowledge:** stage selectors are `div`s with click handlers
and are not keyboard reachable — converting them to `button` is the correct fix when
raised. Palette has drifted to ~28 colours with ~17 near-duplicate pairs;
consolidation is queued and safe. Both are in `DECISIONS.md` §5.

## Definition of done

A change isn't finished until the live site is verified. Build, publish `gh-pages`,
load the real URL, confirm the bundle actually changed, and exercise the thing you
touched. If it involves saved state, confirm progress survives a reload and that an
old transfer code still imports.
