import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// publicDir points at v1's ../public so images are shared (not duplicated) while v1 is still live.
// At cutover, move that folder into client/ and drop this option.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "../public",
  server: {
    port: 5173,
    proxy: { "/api": process.env.VITE_PROXY_TARGET || "http://localhost:5000" },
  },
});
