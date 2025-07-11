import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    // parse jsx
    react(),
    // resolve tsconfig path aliases
    tsconfigPaths(),
  ],

  server: {
    port: Number(3000),
    allowedHosts: true,
    proxy: {
      "/api": {
        target: `http://localhost:${
          // biome-ignore lint/style/noProcessEnv: hella needed
          process.env.BACKEND_PORT
        }`,
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },

  build: {
    target: "esnext",
    sourcemap: true,
    outDir: "../../build/frontend",
    emptyOutDir: true,
  },

  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    reporters: ["verbose"],
    watch: false,
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      include: ["src"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/main.{ts,tsx}"],
    },
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "jsdom",
    passWithNoTests: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
