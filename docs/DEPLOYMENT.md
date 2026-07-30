# Deployment

The app builds to a static site (`dist/`), so any static host works. Below are the common options.

## GitHub Pages (included workflow)

A workflow is provided at `.github/workflows/deploy.yml`. It builds the app and publishes it to GitHub Pages on every push to `main`.

To turn it on:

1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **GitHub Actions**.
4. Push to `main` (or re-run the workflow). The site publishes at
   `https://<your-username>.github.io/<repo-name>/`.

Because `vite.config.js` sets `base: "./"`, the assets resolve correctly under the `/<repo-name>/` subpath. No further config is needed for a project site.

## Netlify

1. New site from Git, point it at the repo.
2. Build command: `npm run build`
3. Publish directory: `dist`

## Vercel

1. Import the repo.
2. Vercel detects Vite automatically. Build command `npm run build`, output `dist`.

## Cloudflare Pages

1. Connect the repo.
2. Framework preset: Vite. Build command `npm run build`, output `dist`.

## Local preview of a production build

```bash
npm run build
npm run preview
```

This serves the built `dist/` locally so you can check it before deploying.

## Notes on `base`

- Project site at `user.github.io/repo/` needs a subpath base. `base: "./"` (the default here) handles this.
- Custom domain or root deploy (`user.github.io/`, Netlify/Vercel root) works with `base: "./"` too, but you can set it to `"/"` if you prefer absolute paths.
