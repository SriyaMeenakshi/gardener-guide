import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Images live in client/public (web-optimised copies of the originals; see server/scripts/optimize-images.mjs).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tailwind runs through its Vite plugin, so no PostCSS plugins are needed. Declaring this explicitly stops Vite
  // from searching parent folders for a postcss.config file and picking up an unrelated one.
  css: { postcss: { plugins: [] } },
  server: {
    port: 5173,
    proxy: { "/api": process.env.VITE_PROXY_TARGET || "http://localhost:5000" },
  },
});
