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
Ankle Mobility ──┬──> Dolphin & Wide Legs ──> Tripod & Crow ──> Handstand
                 ├──> Single-Leg Rise
                 └──> (squat-pattern poses generally)

Wheel / Backbend ──> (shoulder opening that also supports Handstand)
```

Ankle dorsiflexion underpins the most. Dolphin's shoulder flexion is a genuine prerequisite for stacking over the forearms in tripod. Each track's `unlocks` field states its place in the chain, so the ordering isn't arbitrary.

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
