# Steady Practice

A skill-focused yoga launcher. Instead of listing full classes, it organises practice around the specific skills you're building, each with a staged progression, alignment cues, and a few curated tutorial videos.

Built as a single-file React app so the content is easy to edit. Your stage progress is saved in the browser on your device.

> **Before changing anything, read [`docs/DECISIONS.md`](docs/DECISIONS.md).**
> Several things in this project look like inconsistencies or overcaution and are
> deliberate — particularly the safety wording, the video metadata, the dependency
> chain, and the fact that home practice avoids added stretching. That file records
> what not to undo, and the deployment constraints that will otherwise bite you.

## Skill tracks

| Track | Focus | Feeds into |
|-------|-------|-----------|
| Ankle Mobility | Dorsiflexion for flat-foot squatting and clean transitions | Deep squat, single-leg rise, knee-over-toe shapes |
| Deep Squat | Sitting into the bottom position without rolling back | Malasana, low transitions, Skandasana |
| Skandasana / Side Lunge | Loaded side lunge: adductors, ankle, balance | Wide standing poses, straddle, low transitions |
| Dolphin & Wide Legs | Shoulder flexion and wide-leg fold | Tripod, forearm stand, handstand line |
| Overhead & Thoracic | Getting arms truly overhead without rib flare | Dolphin, forearm stand, handstand, wheel |
| Tripod & Crow | Arm-balance base, with the forearm route preferred | Crow-to-tripod transition |
| Single-Leg Rise | Controlled standing on one leg, no hands | Warrior III, standing split rises |
| Wheel / Backbend | Even, safe spinal extension | Deep spinal extension |
| Handstand | Wall drills to freestanding line | Peak inversion |

Tracks are connected, but only where the connection is real. Dolphin's shoulder flexion
precedes tripod; overhead range gates most inversions and backbends; ankle range feeds the
squat pattern and single-leg work. Ankle mobility does **not** feed dolphin, wheel or
handstand — those are limited elsewhere, and an earlier version of this table claimed
otherwise. See [`docs/DECISIONS.md`](docs/DECISIONS.md) §3.

Each track's "why it matters" note spells out its place in that chain.

## Each track gives you

- **A staged progression.** Three stages from foundation to integrated. Tap the stage you're working to mark your place; it's saved on your device. Work a stage until it feels easy before moving up.
- **Key cues.** The handful of things people most often get wrong (parallel feet in wheel, gaze forward in crow, straight line in handstand).
- **Curated videos.** A few vetted tutorials per track, tagged by what they cover. They open on YouTube in a new tab.

## Running locally

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install     # install dependencies
npm run dev     # start the dev server (prints a localhost URL)
npm run build   # production build into dist/
npm run preview # preview the production build locally
```

## Editing the content

All the practice content lives in one array named `TRACKS` at the top of [`src/App.jsx`](src/App.jsx). You don't need to touch any of the layout or styling code to change what the app teaches.

Each track is an object shaped like this:

```js
{
  id: "handstand",          // unique short id, used internally
  label: "Handstand",       // shown on the nav button
  glyph: "│",               // decorative symbol
  tagline: "Wall drills to freestanding line",
  blurb: "...",             // the intro paragraph
  unlocks: "...",           // the "why it matters" note
  stages: [                 // exactly three works best visually
    {
      name: "Prep & assess",
      goal: "Shoulder check + wrist prep + hollow body",
      drills: [
        "Overhead wall test - wrists stack over shoulders",
        // ...one line per drill
      ],
    },
    // ...two more stages
  ],
  cues: [
    "Do handstands early in the session, fresh",
    // ...one line per cue
  ],
  videos: [
    {
      id: "Cbq-2L4UNG8",    // the YouTube watch?v= value
      title: "How to do Handstand - beginner approach",
      by: "Iyengar Yoga",  // teacher or channel
      min: 12,             // rough length in minutes
      tag: "Foundations",  // short category label on the thumbnail
    },
    // ...more videos
  ],
}
```

### Adding a video

Find the video on YouTube, copy the id from its URL (the part after `watch?v=`), and add an entry to that track's `videos` array. The thumbnail is pulled automatically from the id.

### Adding a whole track

Copy an existing track object, give it a new `id`, and fill in the fields. It appears in the nav automatically.

## A note on video links

Videos open on YouTube rather than embedding, because embedded players break silently when a video goes private, whereas a link just takes you to YouTube's own "unavailable" page. Even so, **curated YouTube links rot over time.** If a thumbnail is missing or a link lands on a removed video, swap the id in the `TRACKS` list. The video ids were verified when the app was built, but treat the library as a living list to prune.

## Deploying

The build output is a static site in `dist/`, so it can be hosted anywhere that serves static files (GitHub Pages, Netlify, Vercel, Cloudflare Pages, and so on).

`vite.config.js` sets `base: "./"` so relative asset paths work under a subpath such as a GitHub Pages project site. If you deploy to a domain root instead, you can set `base` back to `"/"`.

A ready-to-use GitHub Pages workflow is included at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the details.

## Project layout

```
steady-practice/
  index.html            # Vite entry
  package.json
  vite.config.js
  src/
    main.jsx            # React bootstrap
    App.jsx             # the whole app: TRACKS data + UI + styles
  docs/
    DECISIONS.md        # why things are the way they are - read before editing
    DEPLOYMENT.md       # hosting and GitHub Pages guide
    CONTENT.md          # deeper guide to the practice content model
  .github/workflows/
    deploy.yml          # GitHub Pages build & deploy
```

## Disclaimer

This app is a personal training aid, not medical or professional coaching advice. Inversions, backbends, and deep loaded ranges carry real injury risk. Work within your range, warm up, and get in-person instruction for anything you're unsure about. See [`docs/CONTENT.md`](docs/CONTENT.md) for more.

## License

MIT. See [`LICENSE`](LICENSE).
