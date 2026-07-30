import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is set for GitHub Pages project sites (served from /<repo>/).
// If you deploy to a custom domain or user/org root, set base to "/".
export default defineConfig({
  plugins: [react()],
  base: "./",
});
