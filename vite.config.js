import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Explicitly set output directory
    emptyOutDir: true, // Ensure the directory is emptied before build
  },
  server: {
    port: 3000, // You can specify your preferred port
  },
});
