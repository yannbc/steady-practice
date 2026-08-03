# Steady Practice — visual brief for Claude

> **Active brief.** Palette, type and technical constraints for any new visual asset, so
> output drops in without rework. Written to be handed to a design tool. The nine draft
> icons in `src/assets/icons/` were authored against it and are awaiting the owner's review.

---

Paste this into Claude before asking for any visual work. It contains the real
palette, type, and technical constraints, so output drops straight into the app
without rework.

---

## 1. What the app is

A static single-page React app (Vite, single `App.jsx`, inline style objects —
no CSS framework, no Tailwind, no external UI library). Nine movement tracks
plus a dated 30-day training block. Warm cream/paper aesthetic, deliberately
calm. No streaks, no gamification, nothing red on a missed day.

Currently it contains **no custom visuals at all** — one `<img>`, a YouTube
thumbnail. Every position is described in text only.

---

## 2. Palette (exact, in use)

| Role | Hex | Notes |
|---|---|---|
| Ink (primary text) | `#2c2622` | near-black, warm |
| Muted text | `#7a6f5e` | secondary copy, labels |
| Line / border | `#d8cbb6` | most-used rule colour |
| Line, softer | `#e7dcc9` | inner dividers |
| Paper | `#fbf1e8` | page background |
| Card | `#f4ede2` | raised surfaces |
| Accent / caution | `#c2562f` | burnt orange — used sparingly, safety only |
| Caution wash | `#fbeee6` | caution block background |
| Green, dark | `#4d5c37` | "done" states |
| Green, mid | `#6a7b4f` | done accents |
| Green wash | `#e8ecd9` | done backgrounds |

**Do not introduce new hues.** The palette is warm neutrals + one orange + one
olive green. Anything cool or saturated will look wrong.

> Known issue: the file currently has 28 distinct hex values with ~17
> near-duplicate pairs (some differ by 1/255). That is drift, not design. Use
> the table above as the canonical set.

## 3. Type

- Display / headings: **Fraunces**, serif
- Body / UI: **Spline Sans**, sans-serif
- Numerals in data contexts: `ui-monospace, SFMono-Regular, Menlo, monospace`

Do not add a fourth family. Do not put live text inside SVG (see §5).

---

## 4. Ranked asks — highest value first

### A. Setup diagrams for the six self-tests ★ best use
Each track opens with a "Where to start" test the user performs **alone, once**,
with nobody to correct them. Every downstream stage and the 30-day retest depend
on getting the setup right.

These depict **apparatus and measurement, not body form** — low risk, high value.

1. **Knee-to-wall** — foot square to wall, toe-to-wall distance marked as a
   dimension line, knee tracking over toes, heel flat and emphasised.
2. **Overhead / thoracic** — supine, low back flat to floor, arms overhead,
   thumbs toward floor. Must clearly show the *rib flare* failure mode as a
   second panel.
3. **Deep squat** — side view, showing the centre-of-mass line falling behind
   the midfoot (why you roll backwards) vs. counterweight held forward moving it
   over the foot.
4. **Skandasana** — front view, heel height on books as the adjustable variable.
5. **Dolphin / straddle** — measurement of straddle angle.
6. **Single-leg stand** — minimal; may not need one.

Style: single-weight line drawing, `#2c2622` on transparent, dimension lines and
arrows in `#c2562f`. Figures can be simplified/abstract — a mannequin, not a
portrait. Accuracy of *angles and contact points* matters far more than anatomy.

### B. Nine track icons ★ high value, zero risk
Current glyphs are arbitrary Unicode characters — `⌇ ⌄ ◺ ⋀ ⇡ △ ⋔ ◡ │`. The
Handstand icon is literally a vertical bar. They are placeholders.

Wanted: nine 24×24 stroke icons, one per track — Ankle Mobility, Deep Squat,
Skandasana, Dolphin & Wide Legs, Overhead & Thoracic, Tripod & Crow, Single-Leg
Rise, Wheel, Handstand.

Nobody copies form from a 24px icon, so these are purely symbolic and carry no
safety risk. Best identity return per unit of effort.

### C. Print sheet for baseline + retest
The tests happen on the floor, phone in hand at awkward angles. A one-page
printable sheet — the §A diagrams, blank fields for day 1 and retest — is
genuinely more usable than the screen for that one task.

### D. Aesthetic review of the 30-day block view ★ what only you can do
Subjective calls that need a human eye on the real thing: does the block view
read as calm or busy, is the two-week strip legible at a glance, does the
caution block feel serious without being alarming, is the taper banner too loud.

---

## 5. Technical constraints for SVG output

Non-negotiable, or the assets will not drop in cleanly:

- **`stroke="currentColor"`**, no hardcoded stroke hex. The app sets colour via
  CSS; icons must inherit.
- **Fixed `viewBox`** — `0 0 24 24` for icons, `0 0 320 240` for diagrams.
  No `width`/`height` attributes.
- **No `<text>` elements.** Fonts are not available inside SVG at render time
  and text will not scale or reflow. Labels are passed as JSX siblings.
- **No external references** — no `<image>`, no web fonts, no filters that need
  a defs block outside the SVG.
- **Stroke-based, not fill-based**, so line weight stays consistent when scaled.
  `stroke-linecap="round"`, `stroke-linejoin="round"`.
- **Single path where possible.** Fewer nodes = smaller inline bundle.
- Optimise before handing over (SVGO or equivalent). Target <2KB per icon.

Deliver as **either** a folder of `.svg` files **or** a single file of named
React components. Do not deliver as a screenshot or a rasterised PNG.

---

## 6. What NOT to ask Claude for

**Do not commission illustrations of the graded stages.** Tempting, but wrong
for this app:

- 18+ stages, each with joint angles that are the *entire* instruction.
- Wrong form is the injury vector here. An illustration that is 80% right is
  worse than text, because people copy pictures and skim words.
- Highest-risk cases: tripod head/hand triangle placement, the wheel exit, crow
  wrist angle. If a drawing shows the head bearing load in tripod, it directly
  contradicts the safety caution three lines above it.

If stage art is wanted later, restrict it to shapes with no injury-critical
geometry (dolphin hold, straddle sit, heel-elevated squat) and have a physio
check them before publishing.

**Do not have Claude rewrite the app.** See §7.

---

## 7. Handoff rule — assets, not applications

This project began with a Claude-generated tarball. It arrived on a `master`
branch with a CI workflow triggered on `main` (would have failed on first push)
and led to a permissions dead-end that cost real time to unpick.

Since then the app has accumulated content that a rewrite would silently mangle:
nine tracks, three safety cautions with verified clinical framing, dosage
guidance, 18 stage alternatives, verified video IDs with checked runtimes, and a
dated plan engine with taper logic.

So: **Claude produces assets and isolated components. Never a whole app.**

Working loop:
1. Claude generates SVGs / a component in an artifact — you iterate on taste.
2. Save the output to `/tasklet/agent/home/steady-practice/src/assets/`.
3. Tasklet integrates, rebuilds, verifies on the live site, and deploys.

That keeps the visual judgement with you — where it belongs, since you can see
the thing and Tasklet cannot — and keeps content and deployment integrity on the
side that has the verification tooling.
