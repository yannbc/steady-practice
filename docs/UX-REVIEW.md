# Steady Practice — UX review & how it travels to other bodies

> **Historical record.** A usability audit of the app. Some findings are fixed, some are
> deliberately deferred (keyboard reachability of stage selectors, palette consolidation),
> and some are still open. [`DECISIONS.md`](DECISIONS.md) §5 is the authoritative list of
> what is knowingly carried. Check there before treating anything here as a live bug.

---

*Reviewed 30 July 2026 against the live site at yannbc.github.io/steady-practice, after the content corrections.*

---

## First, what just shipped

Four changes are live and verified in the rendered app:

- **Tripod & Crow now carries a safety block**, rendered above the progression so it is read before any stage work. Five points: load through hands not head, contraindications, never turn the head while inverted, the symptoms that mean come down now, and bail practice for wrists.
- **Wrist prep moved into crow's first stage** — previously it lived only under Handstand, though crow is where most people first load their wrists.
- **The ankle track has real videos.** The general morning flow is gone, replaced by E3 Rehab (15m, assessment and progressive loading) and Tom Merrick (10m, follow-along routine). Both verified against YouTube on the day.
- **LICENSE now names Yann Burden.**

The `caution` field is optional and documented in `docs/CONTENT.md`, so any track can adopt it without touching layout.

---

## The UX, honestly

### What works, and works well

**The information architecture is right.** Six tracks, one screen each, no navigation depth. Tap a track, read why it matters, pick your stage, watch a video. The entire model is learnable in about four seconds, and there is no menu to get lost in.

**It refuses to gamify.** No streaks, no badges, no "you missed 3 days". Stage progress is a plain self-assessment you set yourself. For a physical practice — where the honest answer to "how am I doing" is often *worse than last month, because I slept badly* — guilt mechanics would actively harm adherence. Leaving them out was a real design decision.

**Prerequisites are stated, not enforced.** The app tells you dolphin comes before tripod, then lets you do what you like. That respects an adult practitioner. Locking tracks would have been the obvious, worse choice.

**Videos link out rather than embed.** The page stays fast and free of tracking iframes, and a dead video degrades to a broken link rather than a broken layout.

**It survives a small screen.** I simulated 390px: no horizontal overflow, the track nav wraps cleanly onto three rows, video cards reflow to 326px. There is not a single media query in the codebase — the layout holds because it was built from flow and auto-fill grids rather than fixed positions. That is the good kind of lazy.

### What doesn't

**1. You cannot use this app with a keyboard.** This is the serious one.

The whole page has **eight focusable elements**: six track buttons and the video links. The stage cards — the app's single most important control, the one thing you actually *do* here — are plain `<div>`s with a click handler and `cursor: pointer`. No `role`, no `tabIndex`, no key handler. A keyboard user can read every word and change tracks, but can never record where they are. A screen reader is given no indication the cards are interactive at all.

This is a twenty-minute fix with no visual change: make them real buttons, add `aria-pressed`, keep the styling.

**2. Status is carried by colour alone in places.** The active track is orange-filled with no `aria-current`. The current stage is marked by an orange ring. Completed stages do get a ✓, which is right — the current stage needs an equivalent text cue.

**3. There is no progress overview.** The nav is six identical buttons. Nothing tells you that you're at stage 3 of ankle and stage 1 of wheel, so every session starts by clicking through tracks to remember where you were. Six small dots in the nav would fix it.

**4. Tap targets are 43px tall** — one pixel under the usual 44px comfort threshold, and these get tapped with sweaty hands mid-practice. Trivially fixable.

**5. Progress cannot leave the device.** localStorage is per-browser, per-device. New phone, cleared cache, or practising on the iPad instead — it's gone. The footer is honest about this, which counts for something, but a copy-to-clipboard export would make the data portable and cost about fifteen lines.

**6. Nothing says how often to practise.** This is the biggest content gap in the UX. The app tells you *what* to do and *how* to know you've progressed, but never *how often* or *how long a stage should take*. "Little and often beats one long session" appears once, in the ankle blurb. Someone following this properly needs to know whether these are daily ten-minute openers or twice-weekly sessions — and whether being stuck at stage 2 for six weeks is normal (it is) or a sign they're doing it wrong.

---

## How it works for a yogi who isn't you

Short version: **this is a personal training plan wearing the clothes of a general product.** That's not a criticism of the work — it's an excellent personal training plan. But the gap between "excellent for Yann" and "usable by another yogi" is wider than it looks, and it's mostly content, not code.

### The framing states your diagnosis as the reader's fact

The ankle track opens: *"The quiet limiter under half your goals."*

For you, demonstrably true — it's why the track exists. For the reader, it's an unexamined claim. Plenty of practitioners are limited by hips, hamstrings, thoracic spine, or shoulders, and their ankles are fine. They'll dutifully spend six weeks on dorsiflexion and wonder why their squat didn't change.

The fix is one word of conditionality: *"If your heels lift in a deep squat, this is your limiter."* Same content, now a test the reader can apply rather than a verdict they must accept.

### It's aimed at one body type, and yoga is full of the opposite one

Every track here adds range or adds load into range. That is the correct prescription for a stiff practitioner.

Yoga populations skew heavily toward the **hypermobile** — people who arrive already able to do the shapes and who are injured by chasing more range. For them, "open the shoulders", "own the bottom position", "even arch" are the wrong instructions; they need stability, end-range strength, and permission to stop short. A hypermobile yogi following this app faithfully could make themselves worse.

One global note would defuse it: *if the shapes come easily and you're chasing depth rather than control, this app's bias toward range isn't for you — work the strength stages and ignore the mobility ones.*

### Four of the six tracks are the same journey

Dolphin → Tripod → Handstand is one arc, and Wheel shares its shoulder work. So a practitioner arrives, and unless their goal is inversions, roughly two tracks apply.

There is no hips track, no hamstrings, no twists, no forward folds, no restorative or breath work. A yogi whose goal is a comfortable lotus, a pain-free seated fold, or simply getting off the floor at seventy finds nothing to work. The architecture supports those tracks perfectly — it's the `TRACKS` array and nothing else — they just haven't been written.

### Every stage assumes a body that can already do a lot

The progressions take for granted: kneeling and floor-to-standing, full weight through the wrists, tolerance for being inverted, and standing on one leg. There are no alternatives offered for the common reasons those fail — wrist pain (fists, parallettes, forearm variants), pregnancy, high blood pressure or glaucoma (inversions genuinely contraindicated), larger bodies where crow's knee-to-triceps shelf doesn't geometrically work, or older joints that need the whole thing done at a wall.

A single "if this doesn't work for you" line per stage would carry enormous weight, and it's pure content.

### Two tracks still have no cautions

Tripod has one now. **Wheel and Handstand have real contraindications and say nothing.** Wheel: lumbar stenosis, spondylolisthesis, pregnancy, shoulder impingement. Handstand: uncontrolled blood pressure, certain eye conditions, wrist and shoulder injury. The field exists now — these are ten minutes of writing each.

### There's no front door

Everyone lands on stage 1 or guesses. Interestingly, two tracks already solve this internally: dolphin's *"Diagnose the limit"* and handstand's *"Prep & assess"* are stage-zero self-tests. That pattern deserves to be every track's opening stage — a two-minute test that tells you where to start. It's the single highest-value change for a stranger using this app.

### Smaller things

- Progression criteria are mostly excellent and objective — *"hold crow for 5+ breaths"*, *"split to stand under control"*. A few are subjective: *"range shows up in the flow"*, *"own the bottom position"*. A stranger can't self-assess those.
- The tone assumes a solo practitioner with no teacher. No "ask your teacher to spot this" anywhere, though tripod and handstand are exactly where a spotter matters.
- One device, one person. A teacher can't run this with students, and two people in a household can't share it.

---

## What I'd do next, in order

**Accessibility and safety — code and content, small**
1. Make stage cards keyboard-operable and screen-reader-legible (~20 min, no visual change)
2. Caution blocks for Wheel and Handstand, using the field that now exists
3. `aria-current` on the track nav; nudge tap targets to 44px

**Generalisation — content only, no layout work**
4. A stage-zero self-test for every track, modelled on dolphin's "Diagnose the limit"
5. An "if this doesn't work for you" alternative line per stage
6. Frequency and expected time-in-stage per track
7. Reframe the ankle blurb from universal claim to conditional test
8. A short global note on hypermobility

**Product**
9. Progress dots per track in the nav
10. Export/import progress as text, so it survives a new phone

Items 4–8 are the ones that decide whether another yogi can use this. None of them touch the layout — which is exactly what the single-file, content-first design was built for.
