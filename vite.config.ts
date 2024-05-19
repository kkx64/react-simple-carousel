import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, UserConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    libInjectCss(),
    dts({ rollupTypes: true, exclude: ["src/stories/**/*"] }),
  ],
  build: {
    sourcemap: false,
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "mylib",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      treeshake: {
        moduleSideEffects: false,
      },
    },
  },
} satisfies UserConfig);
