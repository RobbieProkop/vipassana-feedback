import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  plugins: [react()],
});
