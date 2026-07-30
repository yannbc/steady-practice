import React, { useState, useMemo, useEffect } from "react";

// ============================================================================
// STEADY PRACTICE - skill-focused yoga launcher
// Organised around target skills, not full classes. Each track has staged
// progressions, prerequisite notes, alignment cues, and curated videos.
// Videos open on YouTube (new tab) - most reliable, embeds break on private.
// Video IDs channel and runtime verified against YouTube, 30 Jul 2026; prune anything that 404s over time.
// ============================================================================

const TRACKS = [
  {
    id: "ankle",
    label: "Ankle Mobility",
    glyph: "⌇",
    tagline: "Dorsiflexion for flat-foot squatting & clean transitions",
    blurb:
      "If your heels lift in a deep squat, this is your limiter, and it quietly caps malasana, low lunge, chaturanga step-throughs and every knee-over-toe shape. If your heels already sit flat and comfortable, your time is better spent on another track. Little and often beats one long session. Discomfort is fine, sharp pinching is not.",
    unlocks: "Underpins single-leg rise, deep squats and any knee-over-toe shape.",
    dosage:
      "4 to 6 short sessions a week, 10 to 15 minutes. Ankle tissue is slow: expect 6 to 8 weeks in a stage, not two.",
    startHere: {
      test:
        "Feet hip-width, toes pointing forward. Squat as low as you can with both heels flat on the floor.",
      results: [
        "Heels lift, or you tip backwards \u2014 start at stage 1",
        "Heels stay down but the bottom is a fight \u2014 stage 2",
        "You can sit at the bottom and breathe easily for a minute \u2014 stage 3",
      ],
    },
    stages: [
      {
        name: "Daily openers",
        goal: "Restore basic dorsiflexion range",
        alt:
          "Wall stretch aggravating a sore knee? Do it seated, with a band pulling the shin forward over the foot.",
        drills: [
          "Wall ankle stretch - 30s x3/side, knee over 2nd toe, heel down",
          "Half-kneeling ankle rocks - 10 slow/side, front heel glued",
          "Eccentric calf lowers off a step - 12/side, slow down",
        ],
      },
      {
        name: "End-range loading",
        goal: "Own the bottom position under load",
        alt:
          "No kneeling available, whether from knee pain or pregnancy? Swap the toe-sit for a standing calf stretch on a step, and keep a chair under the squat.",
        drills: [
          "Supported deep squat hold - 30s x3, explore side to side",
          "Toe-sit / ankle flexion sit - build to 60s",
          "Weighted squat sink - light KB held at chest, heels down",
        ],
      },
      {
        name: "Integrated",
        goal: "Range shows up in the flow",
        alt:
          "Deep squats not on the menu? Take the same range through a supported low lunge. The carryover still happens.",
        drills: [
          "Malasana holds mid-flow - breathe, no heel lift",
          "Slow lizard transitions - control the descent",
          "Unsupported squat + reach - test the carryover",
        ],
      },
    ],
    cues: [
      "Track the knee over the 2nd/3rd toe, never let it cave inward",
      "Heel stays down - if it lifts, you're past today's range, back off",
      "Ankles respond slower than hips. Six to eight weeks for real change",
    ],
    videos: [
      {
        id: "4GW6QdSaQ6U",
        title: "Ankle mobility - what limits it and how to test",
        by: "E3 Rehab",
        min: 15,
        tag: "Assessment",
      },
      {
        id: "WkdXHQ74khI",
        title: "Can't squat? Ankle routine - follow along",
        by: "Tom Merrick",
        min: 10,
        tag: "Follow-along",
      },
    ],
  },
  {
    id: "dolphin",
    label: "Dolphin & Wide Legs",
    glyph: "⋀",
    tagline: "Shoulder flexion + wide-leg fold for inversion prep",
    blurb:
      "Dolphin usually stalls on shoulder flexion, not hamstrings. If your torso can't stack over your forearms, the arms and chest drift forward instead of pressing down to lift up. Wide-leg folds add adductor and hamstring length. Both are the doorway to tripod and forearm stand.",
    unlocks: "Direct prerequisite for tripod, forearm stand and handstand line.",
    dosage:
      "3 to 4 sessions a week, around 10 minutes. Shoulder range moves faster than ankles: 3 to 5 weeks per stage is typical.",
    startHere: {
      test:
        "Lie on your back, knees bent, low back flat to the floor. Reach both arms overhead and try to touch the floor behind you.",
      results: [
        "Arms stop short, or the ribs flare to get there \u2014 start at stage 1",
        "Arms reach the floor, but dolphin still rounds or collapses \u2014 stage 2",
        "Overhead is free and dolphin holds with a long spine \u2014 stage 3",
      ],
    },
    stages: [
      {
        name: "Diagnose the limit",
        goal: "Find out if it's shoulders or hamstrings",
        alt:
          "Getting to the floor is the hard part? Run both tests standing against a wall instead.",
        drills: [
          "Chair test - kneel, elbows on seat, hands to prayer behind head",
          "Line from elbows to shoulders to hips = good shoulder range",
          "Line broken = shoulder flexion is your limiter, prioritise it",
        ],
      },
      {
        name: "Open the shoulders",
        goal: "Earn overhead flexion",
        alt:
          "Shoulder pinches overhead? Work below the painful range and build external-rotation strength rather than stretching into it.",
        drills: [
          "Forearms on chair/blocks, sink chest - hold 30-45s",
          "Puppy pose (heart melts) - forearms down, hips over knees",
          "Wide-leg fold with fingers clasped behind, arms overhead",
        ],
      },
      {
        name: "Build dolphin",
        goal: "Hold with a long spine, press to lift",
        alt:
          "Wrists or elbows complain? Stay on the forearms and put the hands on blocks to soften the angle.",
        drills: [
          "Forearm plank first - do arms make a square or a triangle?",
          "Dolphin knees bent, walk feet in, hips over shoulders",
          "Press forearms down, roll shoulders from ears, lengthen spine",
        ],
      },
    ],
    cues: [
      "Elbows stay shoulder-width - they drift wide, hug them in",
      "Press down through the forearms to lift up through the shoulders",
      "Bend the knees freely - spine length beats straight legs here",
    ],
    videos: [
      {
        id: "m-kFo6FdlBA",
        title: "Dolphin Pose for inflexible beginners",
        by: "Man Flow Yoga",
        min: 12,
        tag: "Foundations",
      },
      {
        id: "tEqqGOF7AbA",
        title: "Prasarita Padottanasana - wide-leg fold breakdown",
        by: "Yoga Screen",
        min: 3,
        tag: "Alignment",
      },
    ],
  },
  {
    id: "tripod",
    label: "Tripod & Crow",
    glyph: "△",
    tagline: "Arm balance base into tripod headstand",
    blurb:
      "Crow builds the arm-balance base: weight forward onto the hands, knees to triceps, core switched on. Tripod headstand adds a stable three-point base and gets you comfortable inverted before free-standing work. Build both separately before linking them.",
    unlocks: "Needs dolphin's shoulder range first. Gateway to the crow-to-tripod transition.",
    dosage:
      "3 to 4 short sessions a week, 10 to 15 minutes, on fresh arms rather than at the end of a long practice. 4 to 6 weeks per stage.",
    startHere: {
      test:
        "From a low squat, plant the hands, load the shins onto the backs of the arms and try to lift the feet.",
      results: [
        "Feet will not leave the floor, or the wrists object \u2014 start at stage 1",
        "Crow holds for 5 breaths, but no headstand yet \u2014 stage 2",
        "Both shapes are solid on their own \u2014 stage 3",
      ],
    },
    caution: {
      title: "Read before you invert",
      points: [
        "The head is a reference point, not a pillar. Most of the load belongs in the hands and shoulders - if your neck is taking the weight, come down.",
        "Skip this track entirely if you have a neck injury, disc problems, or recent whiplash, until a clinician clears you.",
        "Never turn or nod your head while inverted. Come down, reposition, go again.",
        "Tingling, numbness, or pinching in the neck or arms means come down now, not after one more breath.",
        "Crow is where wrists usually complain first. Prep them, and practise bailing forward over a cushion before you need to.",
      ],
    },
    stages: [
      {
        name: "Crow foundation",
        goal: "Hold crow for 5+ breaths",
        alt:
          "Wrists unhappy? Work on fists or parallettes. If the knees will not reach the upper arms, take them to the outside of the arms instead, or start with the feet on a block.",
        drills: [
          "Wrist prep first - circles, palm rocks, then gradual load. Never on cold wrists",
          "Squat + hands planted, knees to triceps, tip weight forward",
          "One toe lifts, then the other - stay looking forward not down",
          "Build to 5 breaths, then work on straightening the arms",
        ],
      },
      {
        name: "Tripod base",
        goal: "Stable three-point headstand at wall",
        alt:
          "Any neck history at all? Do this stage on the forearms as a dolphin-supported prep and skip head-loading entirely. Nothing later in the track requires it.",
        drills: [
          "Crown of head + hands = even triangle, not too close",
          "Walk feet in, knees onto triceps shelf (tripod crow)",
          "Slowly extend legs up the wall, squeeze midline",
        ],
      },
      {
        name: "The transition",
        goal: "Crow to tripod and back with control",
        alt:
          "No spotter and no confidence? Practise with the feet staying low and a stack of cushions in front of you.",
        drills: [
          "From tripod, lower knees back to triceps shelf",
          "Sit the hips back, lean to shift weight to hands",
          "Protract the shoulder blades to press back into crow",
        ],
      },
    ],
    cues: [
      "Gaze slightly forward past the fingertips, not back at your feet",
      "Spread the fingers wide and grip the mat to kill the wobble",
      "In tripod the head takes little weight - the arms hold you up",
    ],
    videos: [
      {
        id: "fA7gCOhhgik",
        title: "Crow Pose to Tripod Headstand - safe transition",
        by: "Salti Yoga",
        min: 3,
        tag: "Transition",
      },
      {
        id: "7wk7Rvne8VU",
        title: "Crow to Tripod - control & why it's not for everyone",
        by: "Tate Englund Functional Yoga",
        min: 2,
        tag: "Technique",
      },
    ],
  },
  {
    id: "singleleg",
    label: "Single-Leg Rise",
    glyph: "⋔",
    tagline: "Controlled standing on one leg, no hands",
    blurb:
      "The transition is the skill, not the shape. Rising from a standing split or lunge without hands, or lowering under control on one leg, needs single-leg strength through range, ankle dorsiflexion and balance stacked together. Same qualities as a pistol squat, framed for the mat. Build it bodyweight and controlled.",
    unlocks: "Feeds Warrior III, standing split rises and floor-to-stand transitions.",
    dosage:
      "3 sessions a week, 15 to 20 minutes, with rest days between. This is strength work: 6 to 10 weeks per stage.",
    startHere: {
      test:
        "Stand on one leg, other foot off the floor, hands off the wall. Hold for 30 seconds a side.",
      results: [
        "Wobbling, the hip drops, or you touch down \u2014 start at stage 1",
        "Steady for 30 seconds, but you cannot lower under control past halfway \u2014 stage 2",
        "You can lower most of the way and come back up with light support \u2014 stage 3",
      ],
    },
    stages: [
      {
        name: "Balance & base",
        goal: "Steady on one leg with a level pelvis",
        alt:
          "Balance worse than expected? Fingertips on a wall is a legitimate stage, not cheating. Take them off one at a time.",
        drills: [
          "One-legged mountain - build awareness, standing foot active",
          "Tree, then Warrior III with hands on hips or a wall",
          "Fix the gaze on a still point, breathe, hips level",
        ],
      },
      {
        name: "Strength through range",
        goal: "Load the standing leg deep, with support",
        alt:
          "Knee complaining in deep flexion? Cut the range back to where it is quiet and add repetitions instead of depth.",
        drills: [
          "Single-leg sit-to-stand from a high box/chair, both hands free",
          "Lower the box over weeks - heel down, chest lean controlled",
          "Assisted descents holding a wall or strap, slow eccentric",
        ],
      },
      {
        name: "The rise, no hands",
        goal: "Split to stand under control",
        alt:
          "Rise not happening? Raise the target. Come up from a chair, then a lower block, and drop the height over months.",
        drills: [
          "Standing split with hands on blocks, walk them light",
          "Rise through Warrior III - lead with the chest, not a lurch",
          "Slow both directions, no bounce out of the bottom",
        ],
      },
    ],
    cues: [
      "Keep the standing kneecap facing forward - it'll want to cave in",
      "Control the torso lean, hinge from the hip, don't round the low back",
      "If elevating the heel unlocks it, the ankle was your limiter",
    ],
    videos: [
      {
        id: "tqmZ8Ja9vH4",
        title: "Standing balance - why you wobble & how to fix it",
        by: "Cathy Madeo Yoga",
        min: 25,
        tag: "Balance",
      },
      {
        id: "bfLZAmA4RiI",
        title: "Single-leg sit-to-stand - quick form demo",
        by: "Physio Plus Fitness",
        min: 1,
        tag: "Strength",
      },
    ],
  },
  {
    id: "wheel",
    label: "Wheel / Backbend",
    glyph: "◡",
    tagline: "Urdhva Dhanurasana with an even, safe arch",
    blurb:
      "Wheel needs open quads, hip flexors, thoracic spine and shoulders, plus arm and leg strength, so the lower back doesn't take the whole bend. Modern life keeps us in flexion, so prep matters. Chase an even arch, not maximum depth.",
    unlocks: "Deep spinal extension; complements handstand shoulder opening.",
    dosage:
      "3 sessions a week, around 15 minutes, always on a warm body and never first thing in a session. 6 to 8 weeks per stage.",
    caution: {
      title: "Before you press up",
      points: [
        "Skip this track, or work it only with hands-on guidance, if you have lumbar stenosis, spondylolisthesis or a disc injury. Loaded extension concentrates in exactly the segments those conditions affect.",
        "Not a shape to be learning while pregnant, or with uncontrolled high blood pressure, or with a recent shoulder, wrist or neck injury.",
        "Pain in the low back means the arch is collapsing into the lumbar spine instead of spreading through the hips and upper back. Come down and go back a stage.",
        "Press up only once the arms can straighten. Parking on the crown of the head loads the neck with the weight of the whole shape.",
        "Come out the way you went in: chin tucked, upper back landing first, one segment at a time. Dropping flat is where necks get hurt.",
        "Always warm. This is never the first shape of a session.",
      ],
    },
    startHere: {
      test:
        "Lie on your back, feet close to your seat, and press into a bridge. Then set your hands flat by your ears, fingers pointing to the shoulders.",
      results: [
        "The bridge is a strain, or the shoulders will not let the hands land flat \u2014 start at stage 1",
        "Bridge is strong and the hands land, but you cannot press up \u2014 stage 2",
        "You can press up, but the arch feels stuck in the low back \u2014 stage 3",
      ],
    },
    stages: [
      {
        name: "Warm the front line",
        goal: "Open quads, hip flexors, shoulders",
        alt:
          "Kneeling quad stretch hurting the knee? Do it lying on your side, or standing with the back foot on a chair.",
        drills: [
          "Low lunge sun salutations + quad stretch",
          "Bridge pose - 3 rounds, knees hugging midline",
          "Shoulder openers - clasped hands, gentle chest opener",
        ],
      },
      {
        name: "Bridge to press-up",
        goal: "Strong bridge, then lift to crown",
        alt:
          "Shoulders will not let the hands sit flat by the ears? Elevate the hands on blocks against a wall and keep working the front line.",
        drills: [
          "Bridge holds - feet parallel, press through heels",
          "Palms by ears, lift to crown of head, pause, check elbows",
          "Elbows shoulder-width - hug a block feeling, don't splay",
        ],
      },
      {
        name: "Full wheel",
        goal: "Even arch, calm breath, controlled exit",
        alt:
          "Low back pinching at the top? Come down. Widen the feet slightly, press the floor away harder, and spend another block of weeks at stage 2. This is the shape to be patient with.",
        drills: [
          "Press up, straighten arms, walk feet slightly in",
          "Even sensation head to toe - not all lumbar",
          "One-legged wheel when the base feels solid",
        ],
      },
    ],
    cues: [
      "Feet stay parallel throughout - they'll want to turn out",
      "Use the glutes to lift, then keep them toned not clenched",
      "Elbows in line with shoulders, press evenly through arms and legs",
    ],
    videos: [
      {
        id: "vxXT0NHZPss",
        title: "Urdhva Dhanurasana - alignment principles",
        by: "Monica Arellano",
        min: 6,
        tag: "Alignment",
      },
    ],
  },
  {
    id: "handstand",
    label: "Handstand",
    glyph: "│",
    tagline: "Wall drills to freestanding line",
    blurb:
      "Handstand is a skill you drill, not a pose you jump into. Check shoulder range first: back to wall, arms overhead, wrists should stack over shoulders without straining. Then wall walks, hollow body and kick-up practice. Always warm the wrists.",
    unlocks: "Peak inversion. Shares shoulder & core work with tripod.",
    dosage:
      "4 to 6 short sessions a week, around 10 minutes. This is skill practice, not conditioning, so little and often wins. Two to three months in a stage is normal.",
    caution: {
      title: "Before you go upside down",
      points: [
        "Inversions are contraindicated with uncontrolled high blood pressure, glaucoma or other retinal conditions, recent concussion, and acute neck, shoulder or wrist injury. Check with a clinician if any of those apply to you.",
        "Learn the bail before the hold. Turning out sideways, cartwheel style, is the exit that keeps you safe when the balance goes.",
        "Wrist pain is the most common handstand complaint. Do the wrist prep, and use fists or parallettes if flat hands hurt.",
        "Stack, do not arch. If the ribs flare and the low back grips, the spine is holding the shape instead of the shoulders. Come down.",
        "Dizziness, numbness, tingling or changes in vision mean come down immediately, and do not go back up that session.",
        "A wall or a spotter is not a beginner's crutch. It is the standard tool, at every level.",
      ],
    },
    startHere: {
      test:
        "Kneel facing a wall, arms overhead, and reach to touch the wall with straight arms while keeping the ribs down and the low back quiet.",
      results: [
        "Arms do not reach, or the low back takes over to get there \u2014 start at stage 1",
        "Overhead is clean, but a chest-to-wall handstand will not hold for 30 seconds \u2014 stage 2",
        "Chest-to-wall for 30 seconds with a stacked line \u2014 stage 3",
      ],
    },
    stages: [
      {
        name: "Prep & assess",
        goal: "Shoulder check + wrist prep + hollow body",
        alt:
          "Flat hands painful? Fists or parallettes keep the wrist neutral and let you build everything else.",
        drills: [
          "Overhead wall test - wrists stack over shoulders, no strain",
          "Wrist prep - circles, rocks, load gradually before any weight",
          "Hollow body holds - low back pressed down, 3x20-30s",
        ],
      },
      {
        name: "Wall strength",
        goal: "Build the shape and shoulder endurance",
        alt:
          "Endurance not there yet? Shorten each hold and add sets, rather than grinding out one long hold with a collapsing shape.",
        drills: [
          "Wall walks - walk up only as far as comfortable, 2-4 sets",
          "Chest-to-wall holds - stack, squeeze, breathe",
          "Scapular push-ups - shoulder blades only, 3x8",
        ],
      },
      {
        name: "Balance & kick-up",
        goal: "Find the freestanding line",
        alt:
          "Kick-ups feel unsafe? Stay chest-to-wall and work toe-pulls. Freestanding balance grows out of the wall, not around it.",
        drills: [
          "Kick-ups away from wall, one leg leads, controlled",
          "Fingertip pressure to correct - grip to stop falling over",
          "Bail practice (cartwheel out) before real balancing",
        ],
      },
    ],
    cues: [
      "Do handstands early in the session, fresh - not after cardio",
      "Straight line: ribs in, squeeze the midline, don't banana",
      "Learn to bail safely before you chase the balance",
    ],
    videos: [
      {
        id: "Cbq-2L4UNG8",
        title: "How to do Handstand - beginner Iyengar approach",
        by: "Heather Kitchen Yoga",
        min: 20,
        tag: "Foundations",
      },
      {
        id: "-orC4bLrzHU",
        title: "Handstand drills & progressions for beginners",
        by: "FirestormFreerunning",
        min: 4,
        tag: "Drills",
      },
    ],
  },
];

function thumb(id) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
function watchUrl(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}

const STORAGE_KEY = "steady-practice-progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function App() {
  const [active, setActive] = useState("ankle");
  // per-track stage progress, persisted to localStorage
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage unavailable (private mode etc) - fail silently, app still works
    }
  }, [progress]);

  const [box, setBox] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setBox(JSON.stringify(progress));
  }, [progress]);

  const track = useMemo(() => TRACKS.find((t) => t.id === active), [active]);
  const reached = progress[active] ?? 0; // highest stage index unlocked

  function setStage(i) {
    setProgress((p) => ({ ...p, [active]: i }));
  }

  function resetAll() {
    setProgress({});
    flash("All progress cleared");
  }

  function flash(m) {
    setMsg(m);
    window.setTimeout(() => setMsg(""), 2600);
  }

  function copyCode() {
    const ok = () => flash("Copied");
    const no = () => flash("Couldn't copy - select the text and copy it manually");
    try {
      navigator.clipboard.writeText(box).then(ok, no);
    } catch (e) {
      no();
    }
  }

  function loadCode() {
    let parsed;
    try {
      parsed = JSON.parse(box);
    } catch (e) {
      flash("That code didn't look right");
      return;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      flash("That code didn't look right");
      return;
    }
    const clean = {};
    for (const t of TRACKS) {
      const v = parsed[t.id];
      if (Number.isInteger(v) && v >= 0 && v < t.stages.length) clean[t.id] = v;
    }
    setProgress(clean);
    flash("Progress loaded");
  }

  function resetTrack() {
    setProgress((p) => {
      const next = { ...p };
      delete next[active];
      return next;
    });
  }

  return (
    <div style={S.root}>
      <style>{CSS}</style>

      <header style={S.header}>
        <div style={S.brandRow}>
          <span style={S.mark}>◐</span>
          <div>
            <h1 style={S.h1}>Steady Practice</h1>
            <p style={S.tagline}>skill tracks &amp; progressions</p>
          </div>
        </div>
      </header>

      <nav style={S.trackNav}>
        {TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="trackBtn"
            style={{ ...S.trackBtn, ...(active === t.id ? S.trackActive : {}) }}
          >
            <span style={{ ...S.trackGlyph, ...(active === t.id ? { color: PAPER } : {}) }}>
              {t.glyph}
            </span>
            <span>{t.label}</span>
            {(progress[t.id] ?? 0) > 0 && (
              <span style={S.navDots} aria-hidden="true">
                {t.stages.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      ...S.navDot,
                      ...(i <= (progress[t.id] ?? 0)
                        ? active === t.id
                          ? S.navDotOnActive
                          : S.navDotOn
                        : {}),
                    }}
                  />
                ))}
              </span>
            )}
          </button>
        ))}
      </nav>

      <p style={S.note}>
        <strong style={S.noteStrong}>Read once.</strong> These tracks add range
        and then load it, which suits a stiff body. If the shapes already come
        easily and you are chasing depth rather than control, work the strength
        stages and leave the stretching alone - more range is not your answer.
        None of this is medical advice, and a teacher who can watch you beats a
        video that cannot.
      </p>

      <main className="fade" key={active} style={S.main}>
        <section style={S.hero}>
          <div style={S.heroGlyph}>{track.glyph}</div>
          <div style={S.heroText}>
            <h2 style={S.h2}>{track.label}</h2>
            <p style={S.heroTag}>{track.tagline}</p>
            <p style={S.blurb}>{track.blurb}</p>
            <div style={S.unlocks}>
              <span style={S.unlockLabel}>Why it matters</span>
              {track.unlocks}
            </div>
            {track.dosage && (
              <div style={S.dosage}>
                <span style={S.unlockLabel}>How often</span>
                {track.dosage}
              </div>
            )}
          </div>
        </section>

        {track.caution && (
          <section style={S.caution} role="note" aria-label="Safety guidance">
            <div style={S.cautionTitle}>{track.caution.title}</div>
            <div style={S.cautionList}>
              {track.caution.points.map((p, i) => (
                <div key={i} style={S.cautionItem}>
                  <span style={S.cautionDot} aria-hidden="true">△</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {track.startHere && (
          <section style={S.start}>
            <div style={S.startTitle}>Where to start</div>
            <p style={S.startTest}>{track.startHere.test}</p>
            <div style={S.startList}>
              {track.startHere.results.map((r, i) => (
                <div key={i} style={S.startItem}>
                  <span style={S.startDot} aria-hidden="true">
                    &#9702;
                  </span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROGRESSION STAGES */}
        <section style={S.block}>
          <div style={S.blockHead}>
            <h3 style={S.blockTitle}>Progression</h3>
            {reached > 0 && (
              <button onClick={resetTrack} style={S.resetLink}>
                Reset
              </button>
            )}
          </div>
          <p style={S.blockHint}>
            Tap a stage to mark where you are. Work the current stage until it
            feels easy before moving up. Progress is saved on this device.
          </p>
          <div style={S.stages}>
            {track.stages.map((s, i) => {
              const done = i < reached;
              const current = i === reached;
              return (
                <div
                  key={s.name}
                  onClick={() => setStage(i)}
                  className="stage"
                  style={{
                    ...S.stage,
                    ...(done ? S.stageDone : {}),
                    ...(current ? S.stageCurrent : {}),
                  }}
                >
                  <div style={S.stageHead}>
                    <span
                      style={{
                        ...S.stageNum,
                        ...(done ? S.stageNumDone : {}),
                        ...(current ? S.stageNumCurrent : {}),
                      }}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <div>
                      <div style={S.stageName}>{s.name}</div>
                      <div style={S.stageGoal}>{s.goal}</div>
                    </div>
                  </div>
                  <ul style={S.drills}>
                    {s.drills.map((d, j) => (
                      <li key={j} style={S.drill}>
                        {d}
                      </li>
                    ))}
                  </ul>
                  {s.alt && (
                    <div style={S.alt}>
                      <span style={S.altLabel}>If that doesn't work for you</span>
                      {s.alt}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CUES */}
        <section style={S.block}>
          <h3 style={S.blockTitle}>Key cues</h3>
          <div style={S.cueList}>
            {track.cues.map((c, i) => (
              <div key={i} style={S.cue}>
                <span style={S.cueDot}>◦</span>
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* VIDEOS */}
        <section style={S.block}>
          <h3 style={S.blockTitle}>Watch</h3>
          <div style={S.vidGrid}>
            {track.videos.map((v) => (
              <a
                key={v.id}
                href={watchUrl(v.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="vcard"
                style={S.vcard}
              >
                <div style={S.vthumb}>
                  <img src={thumb(v.id)} alt="" style={S.vimg} />
                  <span className="vplaymark" style={S.vplay}>▶</span>
                  <span style={S.vmin}>{v.min}m</span>
                  <span style={S.vtag}>{v.tag}</span>
                </div>
                <div style={S.vbody}>
                  <div style={S.vby}>{v.by}</div>
                  <div style={S.vtitle}>{v.title}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <section style={S.transfer}>
        <details>
          <summary style={S.summary}>Move or reset your progress</summary>
          <p style={S.transferHint}>
            Progress is saved in this browser, on this device only. Copy the
            code below and paste it on another device to carry your stages
            across.
          </p>
          <textarea
            value={box}
            onChange={(e) => setBox(e.target.value)}
            spellCheck={false}
            rows={2}
            style={S.codeBox}
          />
          <div style={S.btnRow}>
            <button onClick={copyCode} style={S.btn}>
              Copy
            </button>
            <button onClick={loadCode} style={S.btn}>
              Load from box
            </button>
            <button onClick={resetAll} style={{ ...S.btn, ...S.btnQuiet }}>
              Reset everything
            </button>
            {msg && <span style={S.msg}>{msg}</span>}
          </div>
        </details>
      </section>

      <footer style={S.footer}>
        Videos open on YouTube. Dead link means the video went private - edit the
        TRACKS list to swap it. Progress is saved in your browser on this device.
      </footer>
    </div>
  );
}

const ACCENT = "#c2562f";
const ACCENT2 = "#6a7b4f";
const INK = "#2c2622";
const PAPER = "#f4ede2";
const CARD = "#fbf7f0";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Spline+Sans:wght@400;500;600&display=swap');
* { box-sizing: border-box; margin: 0; }
.fade { animation: f .45s ease; }
@keyframes f { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.trackBtn { transition: all .2s ease; }
.trackBtn:hover { border-color: ${ACCENT}; color: ${INK}; }
.stage { transition: all .2s ease; cursor: pointer; }
.stage:hover { border-color: ${ACCENT}; }
.vcard { transition: transform .25s ease, box-shadow .25s ease; }
.vcard:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(44,38,34,.45); }
.vcard:hover span.vplaymark { opacity: 1; transform: scale(1); }
`;

const S = {
  root: {
    minHeight: "100vh",
    background: `radial-gradient(circle at 12% 0%, #f8f2e7 0%, ${PAPER} 60%)`,
    color: INK,
    fontFamily: "'Spline Sans', sans-serif",
    paddingBottom: 60,
  },
  header: {
    padding: "34px 32px 20px",
    borderBottom: "1px solid #e3d8c6",
  },
  brandRow: { display: "flex", alignItems: "center", gap: 14 },
  mark: { fontSize: 38, color: ACCENT, lineHeight: 1 },
  h1: {
    fontFamily: "'Fraunces', serif",
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: "-0.5px",
  },
  tagline: {
    fontSize: 12,
    opacity: 0.6,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },

  trackNav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    padding: "22px 32px 6px",
  },
  trackBtn: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    border: "1px solid #d8cbb6",
    background: CARD,
    color: "#7a6f5e",
    padding: "12px 18px",
    minHeight: 44,
    borderRadius: 999,
    fontSize: 14.5,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Spline Sans', sans-serif",
  },
  trackActive: {
    background: INK,
    color: PAPER,
    borderColor: INK,
  },
  trackGlyph: { fontSize: 17, color: ACCENT },

  main: { maxWidth: 860, margin: "0 auto", padding: "20px 32px 0" },

  hero: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    background: CARD,
    border: "1px solid #e7dcc9",
    borderRadius: 18,
    padding: "26px 28px",
    marginTop: 12,
    marginBottom: 30,
  },
  heroGlyph: {
    fontSize: 64,
    color: ACCENT,
    lineHeight: 1,
    fontFamily: "'Fraunces', serif",
    flexShrink: 0,
  },
  heroText: { display: "flex", flexDirection: "column", gap: 10 },
  h2: { fontFamily: "'Fraunces', serif", fontSize: 27, fontWeight: 600 },
  heroTag: { fontSize: 14, color: ACCENT, fontWeight: 600, marginTop: -4 },
  blurb: { fontSize: 14.5, lineHeight: 1.6, opacity: 0.82 },
  unlocks: {
    fontSize: 13.5,
    background: "#f0ece0",
    borderLeft: `3px solid ${ACCENT2}`,
    padding: "9px 14px",
    borderRadius: 6,
    lineHeight: 1.5,
    marginTop: 2,
  },
  unlockLabel: {
    display: "block",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "1px",
    opacity: 0.55,
    marginBottom: 2,
  },

  block: { marginBottom: 34 },
  note: {
    maxWidth: 900,
    margin: "10px auto 0",
    padding: "0 32px",
    fontSize: 12.8,
    lineHeight: 1.65,
    opacity: 0.62,
  },
  noteStrong: { fontWeight: 600, opacity: 0.9 },
  dosage: {
    fontSize: 13.5,
    background: "#f0ece0",
    borderLeft: "3px solid #b9a88c",
    padding: "9px 14px",
    borderRadius: 6,
    lineHeight: 1.5,
    marginTop: 8,
  },
  start: {
    background: CARD,
    border: "1px solid #e7dcc9",
    borderLeft: `3px solid ${ACCENT2}`,
    borderRadius: 12,
    padding: "16px 18px 17px",
    marginBottom: 32,
  },
  startTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 15.5,
    fontWeight: 600,
    color: ACCENT2,
    marginBottom: 7,
  },
  startTest: { fontSize: 14, lineHeight: 1.55, marginBottom: 10 },
  startList: { display: "flex", flexDirection: "column", gap: 6 },
  startItem: {
    display: "flex",
    gap: 9,
    fontSize: 13.5,
    lineHeight: 1.5,
    opacity: 0.85,
  },
  startDot: { color: ACCENT2, flexShrink: 0 },
  alt: {
    marginTop: 12,
    paddingTop: 11,
    borderTop: "1px dashed #e0d4bf",
    fontSize: 13,
    lineHeight: 1.55,
    opacity: 0.78,
  },
  altLabel: {
    display: "block",
    fontSize: 10.5,
    textTransform: "uppercase",
    letterSpacing: "1px",
    opacity: 0.6,
    marginBottom: 3,
  },
  navDots: { display: "inline-flex", gap: 3, marginLeft: 2 },
  navDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    background: "#d8cbb6",
    display: "inline-block",
  },
  navDotOn: { background: ACCENT },
  navDotOnActive: { background: PAPER },
  transfer: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 32px",
  },
  summary: {
    cursor: "pointer",
    fontSize: 13,
    opacity: 0.6,
    fontFamily: "'Spline Sans', sans-serif",
  },
  transferHint: {
    fontSize: 13,
    opacity: 0.6,
    lineHeight: 1.55,
    margin: "10px 0 10px",
    maxWidth: 560,
  },
  codeBox: {
    width: "100%",
    maxWidth: 560,
    display: "block",
    background: CARD,
    border: "1px solid #e7dcc9",
    borderRadius: 8,
    padding: "9px 11px",
    fontSize: 12.5,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    color: INK,
    resize: "vertical",
  },
  btnRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 9,
    marginTop: 10,
  },
  btn: {
    background: CARD,
    border: "1px solid #d8cbb6",
    borderRadius: 999,
    padding: "9px 16px",
    fontSize: 13,
    minHeight: 44,
    cursor: "pointer",
    color: INK,
    fontFamily: "'Spline Sans', sans-serif",
  },
  btnQuiet: { color: "#8a7f6d", borderStyle: "dashed" },
  msg: { fontSize: 12.5, color: ACCENT2 },
  blockHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
  },
  blockTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 6,
  },
  resetLink: {
    background: "transparent",
    border: "none",
    color: ACCENT,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Spline Sans', sans-serif",
    textDecoration: "underline",
    padding: 0,
  },
  blockHint: { fontSize: 13.5, opacity: 0.6, marginBottom: 16, lineHeight: 1.5 },

  stages: { display: "flex", flexDirection: "column", gap: 12 },
  stage: {
    background: CARD,
    border: "1px solid #e7dcc9",
    borderRadius: 14,
    padding: "18px 20px",
  },
  stageDone: { background: "#eef0e6", borderColor: "#cdd3bb" },
  stageCurrent: { borderColor: ACCENT, boxShadow: `0 0 0 1px ${ACCENT}` },
  stageHead: { display: "flex", alignItems: "center", gap: 14, marginBottom: 12 },
  stageNum: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "2px solid #cbbfa9",
    display: "grid",
    placeItems: "center",
    fontSize: 14,
    fontWeight: 600,
    flexShrink: 0,
    fontFamily: "'Fraunces', serif",
  },
  stageNumDone: { background: ACCENT2, borderColor: ACCENT2, color: "#fff" },
  stageNumCurrent: { background: ACCENT, borderColor: ACCENT, color: "#fff" },
  stageName: { fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500 },
  stageGoal: { fontSize: 13, color: ACCENT, fontWeight: 500 },
  drills: { listStyle: "none", display: "flex", flexDirection: "column", gap: 7, paddingLeft: 44 },
  drill: {
    fontSize: 13.5,
    lineHeight: 1.5,
    opacity: 0.8,
    position: "relative",
    paddingLeft: 16,
  },

  caution: {
    background: "#fbeee6",
    border: "1px solid #edd3c2",
    borderLeft: `3px solid ${ACCENT}`,
    borderRadius: 12,
    padding: "16px 18px 17px",
    marginBottom: 32,
  },
  cautionTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 15.5,
    fontWeight: 600,
    color: ACCENT,
    marginBottom: 9,
  },
  cautionList: { display: "flex", flexDirection: "column", gap: 8 },
  cautionItem: { display: "flex", gap: 9, fontSize: 13.5, lineHeight: 1.55 },
  cautionDot: { color: ACCENT, fontSize: 11, lineHeight: 1.8, flexShrink: 0 },

  cueList: { display: "flex", flexDirection: "column", gap: 9 },
  cue: {
    display: "flex",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.55,
    background: CARD,
    border: "1px solid #e7dcc9",
    borderRadius: 10,
    padding: "12px 16px",
  },
  cueDot: { color: ACCENT, fontSize: 18, lineHeight: 1.2, flexShrink: 0 },

  vidGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 18,
  },
  vcard: {
    background: CARD,
    border: "1px solid #e7dcc9",
    borderRadius: 14,
    overflow: "hidden",
    textDecoration: "none",
    color: INK,
    display: "flex",
    flexDirection: "column",
  },
  vthumb: { position: "relative", aspectRatio: "16/9", background: "#ddd", overflow: "hidden" },
  vimg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  vplay: {
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "rgba(194,86,47,.92)",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontSize: 16,
    opacity: 0,
    transform: "scale(.8)",
    transition: "all .25s ease",
  },
  vmin: {
    position: "absolute",
    bottom: 8,
    right: 8,
    background: "rgba(44,38,34,.85)",
    color: "#fff",
    fontSize: 12,
    padding: "3px 8px",
    borderRadius: 6,
  },
  vtag: {
    position: "absolute",
    top: 8,
    left: 8,
    background: "rgba(106,123,79,.92)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 9px",
    borderRadius: 999,
    letterSpacing: "0.3px",
  },
  vbody: { padding: "14px 15px 16px", display: "flex", flexDirection: "column", gap: 5 },
  vby: { fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: "0.3px" },
  vtitle: { fontFamily: "'Fraunces', serif", fontSize: 15.5, fontWeight: 500, lineHeight: 1.3 },

  footer: {
    textAlign: "center",
    fontSize: 12.5,
    opacity: 0.5,
    padding: "30px 32px 0",
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,
  },
};
