# The content model

This app is deliberately content-first. The code is a thin, stable shell around one data structure. If you only ever touch the `TRACKS` array, you can reshape the entire practice without reading the UI code.

## Design principles

**Skills, not classes.** The unit is a skill you're building (a handstand, an even wheel), not a 30-minute video to follow along with. The videos support the skill; they aren't the point.

**The transition is often the skill.** Rising from a standing split without hands, or moving crow to tripod, is a distinct ability worth training directly, separate from the shapes at either end.

**Name the limiter.** Most skills stall on one specific thing. Dolphin usually stalls on shoulder flexion, not hamstrings. Deep squatting stalls on ankle dorsiflexion. Where there's a known limiter, the first stage or a cue calls it out, sometimes with a self-test.

**Progressions, not just poses.** Each track moves foundation to integrated in three stages. You mark where you are and the app remembers, so it reads as a path rather than a reference page.

## The dependency chain

The tracks aren't independent. Roughly:

```
Dolphin & Wide Legs ──> Tripod & Crow ──> Handstand

Ankle Mobility ──┬──> Single-Leg Rise
                 └──> (squat-pattern poses generally)

Wheel / Backbend ──> (shoulder opening that also supports Handstand)
```

Dolphin's shoulder flexion is the load-bearing link: it is a genuine prerequisite for stacking over the forearms in tripod, and from there for the handstand line. Ankle dorsiflexion matters, but its reach is narrower than it first appears — it gates single-leg rise and squat-pattern shapes, not the inversion chain. Dolphin is limited by shoulder flexion, wheel by quads, hip flexors and thoracic spine, and a handstand puts no load through the ankle at all. Each track's "why it matters" line states its own place in the chain.

## Field reference

See the README's "Editing the content" section for the object shape. A few conventions worth keeping:

- **Three stages per track.** The layout is tuned for three. More or fewer will render, but three keeps the progression readable.
- **Drills are one line each.** Short imperative phrases, ideally with the key cue baked in ("heel stays down"). They aren't full instructions; the videos carry the detail.
- **Cues are the top three or so mistakes.** Not an exhaustive checklist. The things that, if you get them wrong, make the skill not work.
- **Videos: prefer verified ids.** Better to have two working videos than six, half of which 404. Prune aggressively.

## Safety framing

This matters given what the app covers (inversions, backbends, loaded single-leg work). The app is a personal aid, not coaching or medical advice. The content is written to encourage:

- warming up and assessing range before loading it,
- working within your current range rather than forcing end range,
- learning to bail safely (handstand) before chasing balance,
- respecting known injury history (for example, controlling torso lean and hip hinge rather than rounding under load).

None of that substitutes for in-person instruction on the harder skills. Keep that framing if you edit the content.

### Optional: `caution`

A track may carry a `caution` block, rendered above the progression so it is
read before any stage work:

```js
caution: {
  title: "Read before you invert",
  points: ["...", "..."],
}
```

Only `tripod` uses one today, because it is the single track that loads the
cervical spine. Add one to any track where the failure mode is an injury
rather than a missed rep. Keep points specific and actionable — name the
sensation that means stop, not just "be careful".

### Optional field: `dosage`

A one-line answer to "how often, and how long should this take?". Rendered in
the hero under "How often". Give frequency, session length, and a realistic
number of weeks in a stage, so nobody assumes they are failing at week three.

```js
dosage: "3 sessions a week, around 15 minutes, always on a warm body. 6 to 8 weeks per stage.",
```

### Optional field: `startHere`

A self-test that tells a newcomer which stage to begin at, rendered above the
progression. `test` is a single physical thing to try; `results` map outcomes to
stages, one line each, in stage order.

```js
startHere: {
  test: "Feet hip-width, toes forward. Squat as low as you can with both heels flat.",
  results: [
    "Heels lift, or you tip backwards - start at stage 1",
    "Heels stay down but the bottom is a fight - stage 2",
    "You can sit at the bottom and breathe easily for a minute - stage 3",
  ],
},
```

### Optional field: `alt` (per stage)

One line inside a stage covering the common reason that stage does not work for
a given body - wrist pain, knee pain, pregnancy, no floor access - and what to
do instead. Rendered under the drills as "If that doesn't work for you".

```js
{
  name: "Crow foundation",
  goal: "Hold crow for 5+ breaths",
  drills: [...],
  alt: "Wrists unhappy? Work on fists or parallettes.",
}
```

Write these for the reader who cannot do the stage as written, not for the
reader who finds it easy. A track without `alt` lines silently assumes a body
that can kneel, bear weight through the wrists and stand on one leg.

## The 30-day block (plan view)

The app has two views, switched at the top: **Skill tracks** (the reference
progressions) and **30-day block** (a dated training block).

The block is built on one principle: *class is where you spend range, home is
where you build the capacity to own it.* Range-of-motion gains plateau at about
10 minutes per week per muscle group, so someone already attending frequent
classes gains nothing from more stretching at home. The block therefore
prescribes strength and skill, and keeps stretching minimal and targeted.

Data lives in three constants near the bottom of `src/App.jsx`:

- `SESSIONS` - the three session types (`skill`, `strength`, `mobility`), each
  with a label, length, an aim, and a list of items. An item may carry a
  `track` id, which renders an "open track" jump into the matching progression.
- `WEEK` - array of 7 arrays, Sunday first, mapping weekday to session types.
  An empty array is a rest day. Strength days are spaced 72h+ apart by design.
- `BASELINE` - the day-one tests. Each has an `id`, `name`, `prompt`, optional
  `note`, and `fields` (each `{ k, label }`). The same fields are reused for the
  retest, which unlocks five days before the retreat date.

Phases derive from the retreat date the user sets:

| Days to retreat | Behaviour |
|---|---|
| more than 5 | normal block |
| 5 or fewer | retest column appears next to the baseline |
| 4 or fewer | taper banner, "half volume" tag on sessions |
| 0 or fewer | training view replaced by an at-the-retreat note |

Plan state is stored separately under `steady-practice-plan`. The transfer code
in "Move or reset your progress" now carries `{ progress, plan }`. Older codes
that are a bare progress map are still accepted.

Deliberately absent: streaks, completion percentages, and any red marking of
missed days. The two-week strip exists so hard-session spacing is visible, not
to create obligation.
