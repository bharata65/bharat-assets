import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages deployment, set `base` to your repository name.
  // Example: if your repo is https://github.com/<user>/bharat-assets
  // then uncomment the line below so asset paths resolve correctly.
  // base: "/bharat-assets/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
})
