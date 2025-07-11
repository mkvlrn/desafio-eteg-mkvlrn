import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import nodeExternals from "rollup-plugin-node-externals";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// application entry point
const entry = ["./src/main.ts", "./src/server/seed.ts"];

export default defineConfig({
  resolve: {
    alias: {
      ".prisma/client/index-browser": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "..",
        "..",
        "node_modules/.prisma/client/index-browser.js",
      ),
    },
  },

  plugins: [
    // externalize node built-ins only, deps are bundled
    nodeExternals({}),
    // resolve tsconfig path aliases
    tsconfigPaths(),
  ],

  build: {
    target: "esnext",
    lib: {
      entry,
      formats: ["es"],
    },
    sourcemap: true,
    outDir: "../../build/backend",
    emptyOutDir: true,
  },

  test: {
    include: ["./src/**/*.test.{ts,tsx}"],
    reporters: ["verbose"],
    watch: false,
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      include: ["./src"],
      exclude: ["./src/**/*.test.{ts,tsx}", "./src/main.{ts,tsx}"],
    },
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
  },
});
