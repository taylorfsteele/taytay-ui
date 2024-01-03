import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@storybook/blocks"],
  },
  test: {
    coverage: {
      thresholds: {
        "100": true,
      },
      include: ["src/"],
      exclude: ["src/index.ts", "src/**/*.stories.{ts,tsx}", "src/**/*.test.{ts,tsx}", "src/types.ts"],
    },
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./testSetup.ts"],
  },
});
