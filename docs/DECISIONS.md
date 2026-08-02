# Decisions

Why this app is the way it is.

`README.md` says what it does. `CONTENT.md` says how to edit it. **This file says what
not to undo.**

Most of what follows looks like it could be tidied up. Several things look like
inconsistencies, redundancy, or overcautious wording. They aren't — each one is the
result of a specific check. If you're an agent or a contributor about to improve
something here, read the relevant section first. Where a change is genuinely fine,
this file says so.

---

## 1. Hard infrastructure constraints

These are not preferences. Work that ignores them fails.

**`.github/workflows/` cannot be pushed via the GitHub app integration.** GitHub
rejects writes to that path from apps lacking the Workflows permission. A workflow
file exists in the repo but must be edited by a human with a normal token.

**Consequence: Pages serves a prebuilt `gh-pages` branch.** Source lives on `main`;
the built `dist/` is published to `gh-pages` directly. There is no CI build. If you
change `src/`, the site does not update until someone rebuilds and pushes the branch.
Forgetting this produces the most common false alarm on this project — "the deploy
didn't work" when it did.

**`vite.config.js` sets `base` for a project page.** The site is served from
`/steady-practice/`, not a domain root. Changing `base` breaks every asset path.

**The app is 100% static. There is no server and no secret storage.** Any API key in
the bundle is public. This blocks the obvious version of any feature calling a paid
API — TTS, LLM Q&A — until a token-minting service exists elsewhere. It is not a
caution; it is a wall.

**All state is `localStorage`**, under two keys: `steady-practice-progress` (per-track
stage) and a separate plan key (block dates, baseline, session log). There is no
account and no sync. The export/import transfer code exists because of this, and it
validates aggressively — out-of-range stages, unknown session types, malformed dates
and oversized payloads are discarded rather than trusted. **Keep that validation.**
Codes issued before the plan view existed still load, and should continue to.

---

## 2. The content is safety-bearing. Treat it as such.

Nine tracks live in the `TRACKS` array in `src/App.jsx` (~2,339 lines, content and UI
in one file — deliberate; see §5).

Six tracks carry a `caution` block: **Deep Squat**, **Skandasana / Side Lunge**,
**Overhead & Thoracic**, **Tripod & Crow**, **Wheel / Backbend**, **Handstand**. Each
renders above the progression, not below it. That position is intentional — a warning
under the drills is a warning read after the attempt.

### Wordings that are load-bearing

**Skandasana: "Adductors tear more readily than they lengthen."** *Tear*, not
*tighten*, and not softened. The adductor group is a genuine strain site in forced
side-lunge work, and the failure is acute rather than gradual. Softening this to
generic "go gently" language removes the only sentence that names the actual risk.

**Tripod & Crow routes toward forearms.** The caution points newer and older
practitioners to the forearm route rather than head-loaded work. This is not
conservatism by default. Head- and tripod-supported inversions axially load the
cervical spine, and degenerative findings are common in asymptomatic people by this
age — roughly **80% show disc degeneration at 50** (Brinjikji et al., AJNR). Yoga
adverse-event reviewers specifically advise beginners away from headstand (Cramer et
al.). The forearm route also transfers better to handstand. Do not "restore balance"
by promoting tripod as a peer option for beginners.

**Handstand lists absolute contraindications** — uncontrolled hypertension, glaucoma
and retinal conditions, recent concussion, acute neck/shoulder/wrist injury. These are
categorical, not graded. Do not merge them into general "listen to your body" advice.

**Pain language is specific on purpose.** "Discomfort is fine, sharp pinching is not"
distinguishes two different signals. Generic "don't push into pain" loses the
distinction and is worse advice.

**Hip morphology is acknowledged, not promised around.** Cam morphology appears in
about **23% of asymptomatic general samples and 55% of athletes** (Frank et al.).
Bone sets range limits training cannot move. The content says a hard, abrupt,
reproducible block differs from an elastic pull — so a user can tell "not yet" from
"not ever" without a scan. Do not replace this with encouragement.

### Video metadata is verified. Do not add unverified entries.

Every video was checked against live data for title, channel and runtime. This
mattered: on first audit **8 of 10 durations were wrong** — one 50-second clip was
labelled "6m" — and **6 of 10 attributions read "Tutorial"**, which is not a channel.
One credited "Iyengar Yoga," a style rather than the creator.

Duration is a planning signal. Users decide whether a session fits the time they have.
Wrong durations make the field worse than absent. **Estimating a runtime is not
acceptable here** — check it or leave the video out.

---

## 3. Decisions that look like errors and are not

**Ankle mobility does not feed dolphin, wheel, or handstand.** An earlier dependency
chain claimed it did. It was drawn to look complete. Dolphin is forearm-supported;
wheel is limited by quads, hip flexors, thoracic spine and shoulders; ankles bear no
load in a handstand. Those three arrows were removed after they contradicted the app's
own blurbs. Ankle → single-leg rise and ankle → squat-pattern shapes are real and
remain. **Do not restore the tidier diagram.**

**`unlocks` is forward-looking except on Tripod**, where it states a prerequisite
("Needs dolphin's shoulder range first"). This is a known semantic wart. Splitting it
into `needs` and `unlocks` is a welcome change — but do it as a field change, not by
rewriting Tripod's text to point forwards, which would lose the warning.

**Home practice deliberately avoids added stretching.** This is the most
counter-intuitive decision in the project and the easiest to "fix" wrongly. Range
gains from static stretching plateau around **10 minutes per week per muscle group**
(Ingram et al., 2025 meta-regression). A dense class schedule likely already spends
that budget. Extra home stretching past the plateau adds fatigue and exposure with no
demonstrated additional range. Home work is therefore strength and skill.

**This rests on an assumption worth restating:** that the user's class load is
genuinely dense. If classes are gentler than assumed, the block is under-dosed on
mobility. That's a judgement from dose-response literature, not from logged holds.

**Calf and tendon loading starts even though it cannot finish in 30 days.** Tendon
remodelling needs **≥12 weeks** of progressive loading. Starting anyway is correct —
but do not relabel it as something that pays off within the block.

**One genuine rest day.** Strength sits Tuesday and Friday, 72+ hours apart, and the
app warns when logged sessions fall closer. Middle-aged trained men show greater
symptoms and slower recovery after damaging exercise; capacity at this age is intact,
recovery margin is narrower. The empty Sunday is content, not a gap to fill.

**No streaks, no completion percentage, nothing red on a missed day.** Deliberate. The
two-week strip exists to show the *spacing* of hard sessions, not adherence. Adding
gamification would fight the rest day the plan depends on.

---

## 4. Scope boundary: general tracks, personal block

**The nine skill tracks are general.** Anyone can use them.

**The 30-day block is not.** Its frequencies, its "at 49" framing and its taper assume
one specific user — a fit 49-year-old, yoga-novice, with a retreat as the end date.

Keep this boundary explicit. Generalising the block means redoing the dosage
reasoning, not just parameterising the dates. Adding personal assumptions into a track
quietly makes it wrong for everyone else.

---

## 5. Known debt, deliberately carried

**Stage selectors are `div`s with click handlers.** They are not keyboard reachable.
This is a real accessibility defect, consciously deferred by the project owner, and
converting them to `button` elements is the correct fix when it's raised. A side
effect worth knowing: because the drill list sits inside the clickable region,
selecting drill text also sets your stage.

**Progress semantics are "current stage," not "highest reached."** Tapping stage 1
after reaching stage 3 discards progress silently — no undo, no confirmation.

**The palette has drifted to ~28 colours with ~17 near-duplicate pairs**, some
differing by a single value out of 255. Consolidation is queued and safe.

**`LICENSE` reads "Copyright (c) 2026 Steady Practice."** Should be the author's name.
One-line fix, still outstanding.

**Content and UI share one file by design.** It keeps content edits from requiring a
build-system tour. Splitting `TRACKS` into its own module is reasonable; splitting it
across nine files is not — the cross-track consistency checks get much harder.

**The three-stage layout is a constraint, not a claim.** It suits ankle mobility. It
badly understates handstand, realistically a multi-year skill compressed into three
peers. If you add stage counts, start there.

---

## 6. Where the rest of the reasoning lives

This file is the summary. The fuller working — the evidence brief with citations, the
content audit, the UX review, the visual brief and the voice/RAG assessment — was
produced alongside the app and is not in this repo. If you're picking this up cold and
something here seems arbitrary, that's where the detail is.

**The rule of thumb:** anything touching necks, adductors, lumbar spines or dosage had
a reason. Check before smoothing it out.
