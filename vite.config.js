/* This code snippet is a configuration file for a JavaScript project using Vite, a build tool for
modern web development. Here's a breakdown of what it does: */
// AI Generated from Phind
// This configuration is for Vanilla Javascript, SCSS support with Debugging in the browser

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  base: "/",

  server: {
    port: 3000,
    open: true,
    hmr: true,
  },

  build: {
    outDir: "../dist",
    assetsDir: "assets",
    minify: "esbuild",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@js": resolve(__dirname, "./src/js"),
      "@scss": resolve(__dirname, "./src/scss"),
    },
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: (source, fp) => {
          // Om filen är main.scss, lägg inte till ytterligare import
          if (fp.endsWith("main.scss")) return source;
          // Annars, lägg till import av main.scss
          return `@import "@scss/main.scss"; ${source}`;
        },
      },
    },
  },

  publicDir: "../public",
});
