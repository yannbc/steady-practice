# Steady Practice — critical content review

> **Historical record — 30 July 2026.** The defects catalogued here have since been
> **fixed**: video durations and channel attributions were corrected against live data,
> the mismatched ankle and handstand videos were replaced, and the false dependency-chain
> arrows were removed. Do not act on the findings as if they were open. Kept because it
> documents *how* the current content was arrived at, and because §1 lists what is worth
> protecting when you edit. Current state lives in [`DECISIONS.md`](DECISIONS.md).

---

*Reviewed 30 July 2026. Every factual claim below was checked against the live YouTube data, not inferred.*

---

## Verdict

The **writing** is the strongest thing here. The **metadata is not trustworthy**, and the
**dependency chain contradicts the app's own text**. Neither is hard to fix, but both
undermine the app's core promise — that this is curated rather than assembled.

The single most damaging finding: **8 of 10 video durations are wrong**, several by a factor
of 5 or more. The app confidently displays "6m" beside a clip that is 50 seconds long.

---

## 1. What genuinely works

Worth protecting when you edit.

- **"Name the limiter" is a real coaching principle**, applied properly. Dolphin stalling on
  shoulder flexion rather than hamstrings is correct and is the kind of thing most yoga
  content gets wrong.
- **The dolphin chair self-test** (kneel, elbows on seat, check the elbow–shoulder–hip line)
  is the best single item in the app. It converts a vague "work on shoulders" into a pass/fail
  diagnostic.
- **Treating the transition as the skill** — crow→tripod, split→stand — is a genuinely useful
  frame that most pose libraries miss.
- **Cue quality is high and specific.** "Heel stays down — if it lifts, you're past today's
  range" and "gaze past the fingertips, not back at your feet" are the actual failure modes,
  not filler.
- **"Six to eight weeks for real change"** sets an honest expectation. It's the only place the
  app does this, which is itself a problem (see §4).

---

## 2. Factual defects — verified

### 2.1 Durations are largely fabricated

All ten video IDs resolve — that part of the source comment is true. The `min` field is not.

| Track | Claimed | Actual | Verdict |
|---|---|---|---|
| Ankle — Sunrise Yoga | 15m | **15m34s** | ok |
| Dolphin — Man Flow | 10m | **12m05s** | close |
| Dolphin — Prasarita | 8m | **2m40s** | 3× over |
| Tripod — Salti Yoga | 8m | **3m18s** | 2.4× over |
| Tripod — Tate Englund | 10m | **2m22s** | 4× over |
| Single-leg — Cathy Madeo | 12m | **24m43s** | 2× **under** |
| Single-leg — Physio Plus | 6m | **0m50s** | **7× over** |
| Wheel — Monica Arellano | 9m | **5m36s** | 1.6× over |
| Handstand — Iyengar | 12m | **19m59s** | 1.7× under |
| Handstand — Firestorm | 14m | **3m55s** | 3.6× over |

Duration is a *planning* signal — it's how you decide whether a session fits the gap you have.
Wrong in both directions means it can't be used for that. The 50-second clip labelled "6m" and
described as "step by step" is a demo, not a tutorial.

### 2.2 Six of ten attributions are placeholders

The `by` field renders directly in the UI, and six entries say **"Tutorial"** — which is not a
channel. The real creators are known and creditable:

| ID | Shown as | Actually |
|---|---|---|
| tEqqGOF7AbA | Tutorial | Yoga Screen |
| fA7gCOhhgik | Tutorial | Salti Yoga |
| tqmZ8Ja9vH4 | Tutorial | Cathy Madeo Yoga |
| bfLZAmA4RiI | Tutorial | Physio Plus Fitness |
| vxXT0NHZPss | Tutorial | Monica Arellano |
| -orC4bLrzHU | Tutorial | FirestormFreerunning |

One more is misattributed rather than blank: the handstand video credits **"Iyengar Yoga"**,
which is the *style*, not the channel — it's **Heather Kitchen Yoga**.

### 2.3 Two videos don't match their track

- **Ankle Mobility** gets *"Sunrise Yoga — 15-Minute Morning Yoga Practice"* by Adriene. It's a
  general morning flow. It teaches no dorsiflexion, no wall stretch, no eccentric calf work.
  The one track whose only video doesn't address its own subject.
- **Handstand** pairs a 20-minute **Iyengar** tutorial with a 4-minute **parkour/freerunning**
  drills video. Those teach different technical models — Iyengar's wall-and-kick-up approach
  versus the hollow-body straight line. The track's own cues ("ribs in, don't banana") are the
  gymnastics model, so the Iyengar video argues against the text above it.

---

## 3. The dependency chain contradicts the app's own blurbs

`docs/CONTENT.md` presents this as the organising insight:

```
Ankle Mobility ──┬──> Dolphin & Wide Legs ──> Tripod & Crow ──> Handstand
                 ├──> Single-Leg Rise
                 └──> (squat-pattern poses generally)
```

Two of those arrows don't survive contact with the app's own writing.

- **Ankle → Dolphin is wrong.** The dolphin blurb states the limiter is shoulder flexion, "not
  hamstrings" — and certainly not ankles. Dolphin is a forearm-supported shape; dorsiflexion is
  not involved.
- **Ankle → handstand base is wrong.** The ankle track's `unlocks` claims it "underpins... 
  handstand base," but the handstand track says the prerequisites are shoulder range, wrist
  extension and hollow-body strength. Ankles hold no weight in a handstand.
- **Ankle → wheel prep is wrong** for the same reason: the wheel blurb lists quads, hip flexors,
  thoracic spine and shoulders. No ankles.

What *is* defensible: ankle → single-leg rise (the track's own cue confirms it — "if elevating
the heel unlocks it, the ankle was your limiter") and ankle → squat-pattern poses.

So ankle mobility is real and important, but its reach has been inflated to make a tidy diagram.
The chain was drawn to look complete rather than to be true.

**The `unlocks` field is also semantically overloaded.** Most tracks use it for what they lead
*to*; Tripod uses it for what it *needs* ("Needs dolphin's shoulder range first"). One field,
two opposite meanings, rendered in the same place in the UI.

---

## 4. Safety gaps

`CONTENT.md` claims the content encourages "warming up and assessing range before loading it"
and "learning to bail safely." Partly true, unevenly applied.

- **No neck caution anywhere in Tripod & Crow.** This is the most significant omission. Tripod
  headstand loads the cervical spine, and it's the most contested item in the app — plenty of
  teachers won't teach it to beginners at all. There's a good cue ("the head takes little
  weight — the arms hold you up") but no statement of the risk, no "come down if you feel it in
  your neck," no suggestion of building against a wall first for the neck's sake specifically.
  The *second video's title* mentions "why it's not for everyone" — the app leans on a YouTube
  title to carry its safety message.
- **Wrist prep appears only in Handstand.** Crow and tripod load wrists heavily in deep
  extension, and crow is where most people first meet wrist pain. The prep exists in the app
  already — it's just filed under the wrong track.
- **Pain guidance appears once.** "Discomfort is fine, sharp pinching is not" is excellent, and
  lives only in Ankle. Nothing equivalent for lumbar sensation in Wheel or neck in Tripod,
  where the stakes are meaningfully higher.
- **No warm-up gate.** Wheel builds warm-up into stage 1 and handstand says "do these early,
  fresh," but a user landing on Tripod & Crow gets no such prompt.

---

## 5. Structural issues

- **Three stages is a layout constraint wearing a content costume.** `CONTENT.md` admits the
  layout is "tuned for three." That's fine for ankle mobility. For handstand — realistically a
  multi-year skill — compressing prep → wall → freestanding into three peers implies a
  parity that doesn't exist. Ankle is the only track that states a timeline; handstand, which
  needs one most, doesn't.
- **Dosage is inconsistent.** Some drills are fully prescribed ("30s x3/side", "3x8"), others
  are bare ("Bridge pose — 3 rounds", "Malasana holds mid-flow"). No track states a weekly
  frequency, so "little and often" is advice without a number.
- **The dependency chain is invisible in the app.** The single most useful organising idea
  lives only in a markdown file in the repo. On the site, six tracks sit as equal tabs with no
  suggested entry point. A first-time user has no idea that dolphin gates tripod.
- **Progress semantics are mislabelled.** The code comments call it "highest stage index
  unlocked," but the setter assigns any index, so it's really *current stage* — tapping stage 1
  after reaching 3 silently discards progress, with no undo and no confirmation on Reset.
- **Stages aren't keyboard accessible.** They're `div`s with `onClick` — no `role`, no
  `tabIndex`, no key handler. The app has exactly two real buttons (track tabs and Reset), so
  the primary interaction can't be reached without a mouse or touch. A side effect: because the
  drill list sits inside the clickable region, trying to select drill text sets your stage.

---

## 6. What I'd fix, in order

1. **Correct all ten durations and the six placeholder attributions.** Mechanical, verified
   data already in hand, and it's what most damages credibility.
2. **Replace the ankle video** with an actual dorsiflexion tutorial, and **add a neck caution**
   to Tripod & Crow.
3. **Move wrist prep** from Handstand into a shared prerequisite, or duplicate it into Tripod.
4. **Fix the dependency chain** to match the blurbs — drop ankle→dolphin, ankle→wheel,
   ankle→handstand — and split `unlocks` into `needs` and `unlocks`.
5. **Surface the chain in the app**, even as one line per track ("do Dolphin first").
6. **Make stages real buttons.** Small change, restores keyboard access.
7. **Add a timeline to handstand**, matching ankle's honesty about pace.

Items 1–4 are edits to the `TRACKS` array and one markdown file — no layout work, exactly the
kind of change the content-first design was built to absorb.
