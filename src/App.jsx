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
      "The quiet limiter under half your goals. Sitting flat, malasana, low lunge, chaturanga step-through and the base of a handstand all need ankle range. Little and often beats one long session. Discomfort is fine, sharp pinching is not.",
    unlocks: "Underpins single-leg rise, deep squats and any knee-over-toe shape.",
    stages: [
      {
        name: "Daily openers",
        goal: "Restore basic dorsiflexion range",
        drills: [
          "Wall ankle stretch - 30s x3/side, knee over 2nd toe, heel down",
          "Half-kneeling ankle rocks - 10 slow/side, front heel glued",
          "Eccentric calf lowers off a step - 12/side, slow down",
        ],
      },
      {
        name: "End-range loading",
        goal: "Own the bottom position under load",
        drills: [
          "Supported deep squat hold - 30s x3, explore side to side",
          "Toe-sit / ankle flexion sit - build to 60s",
          "Weighted squat sink - light KB held at chest, heels down",
        ],
      },
      {
        name: "Integrated",
        goal: "Range shows up in the flow",
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
        id: "r7xsYgTeM2Q",
        title: "15 Min Morning Yoga - gentle joint wake-up",
        by: "Yoga With Adriene",
        min: 16,
        tag: "Warm-up",
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
    stages: [
      {
        name: "Diagnose the limit",
        goal: "Find out if it's shoulders or hamstrings",
        drills: [
          "Chair test - kneel, elbows on seat, hands to prayer behind head",
          "Line from elbows to shoulders to hips = good shoulder range",
          "Line broken = shoulder flexion is your limiter, prioritise it",
        ],
      },
      {
        name: "Open the shoulders",
        goal: "Earn overhead flexion",
        drills: [
          "Forearms on chair/blocks, sink chest - hold 30-45s",
          "Puppy pose (heart melts) - forearms down, hips over knees",
          "Wide-leg fold with fingers clasped behind, arms overhead",
        ],
      },
      {
        name: "Build dolphin",
        goal: "Hold with a long spine, press to lift",
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
    stages: [
      {
        name: "Crow foundation",
        goal: "Hold crow for 5+ breaths",
        drills: [
          "Squat + hands planted, knees to triceps, tip weight forward",
          "One toe lifts, then the other - stay looking forward not down",
          "Build to 5 breaths, then work on straightening the arms",
        ],
      },
      {
        name: "Tripod base",
        goal: "Stable three-point headstand at wall",
        drills: [
          "Crown of head + hands = even triangle, not too close",
          "Walk feet in, knees onto triceps shelf (tripod crow)",
          "Slowly extend legs up the wall, squeeze midline",
        ],
      },
      {
        name: "The transition",
        goal: "Crow to tripod and back with control",
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
    stages: [
      {
        name: "Balance & base",
        goal: "Steady on one leg with a level pelvis",
        drills: [
          "One-legged mountain - build awareness, standing foot active",
          "Tree, then Warrior III with hands on hips or a wall",
          "Fix the gaze on a still point, breathe, hips level",
        ],
      },
      {
        name: "Strength through range",
        goal: "Load the standing leg deep, with support",
        drills: [
          "Single-leg sit-to-stand from a high box/chair, both hands free",
          "Lower the box over weeks - heel down, chest lean controlled",
          "Assisted descents holding a wall or strap, slow eccentric",
        ],
      },
      {
        name: "The rise, no hands",
        goal: "Split to stand under control",
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
    stages: [
      {
        name: "Warm the front line",
        goal: "Open quads, hip flexors, shoulders",
        drills: [
          "Low lunge sun salutations + quad stretch",
          "Bridge pose - 3 rounds, knees hugging midline",
          "Shoulder openers - clasped hands, gentle chest opener",
        ],
      },
      {
        name: "Bridge to press-up",
        goal: "Strong bridge, then lift to crown",
        drills: [
          "Bridge holds - feet parallel, press through heels",
          "Palms by ears, lift to crown of head, pause, check elbows",
          "Elbows shoulder-width - hug a block feeling, don't splay",
        ],
      },
      {
        name: "Full wheel",
        goal: "Even arch, calm breath, controlled exit",
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
    stages: [
      {
        name: "Prep & assess",
        goal: "Shoulder check + wrist prep + hollow body",
        drills: [
          "Overhead wall test - wrists stack over shoulders, no strain",
          "Wrist prep - circles, rocks, load gradually before any weight",
          "Hollow body holds - low back pressed down, 3x20-30s",
        ],
      },
      {
        name: "Wall strength",
        goal: "Build the shape and shoulder endurance",
        drills: [
          "Wall walks - walk up only as far as comfortable, 2-4 sets",
          "Chest-to-wall holds - stack, squeeze, breathe",
          "Scapular push-ups - shoulder blades only, 3x8",
        ],
      },
      {
        name: "Balance & kick-up",
        goal: "Find the freestanding line",
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

  const track = useMemo(() => TRACKS.find((t) => t.id === active), [active]);
  const reached = progress[active] ?? 0; // highest stage index unlocked

  function setStage(i) {
    setProgress((p) => ({ ...p, [active]: i }));
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
          </button>
        ))}
      </nav>

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
          </div>
        </section>

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
    padding: "10px 18px",
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
