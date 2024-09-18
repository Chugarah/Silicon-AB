import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import Icons from "unplugin-icons/vite";
import { visualizer } from "rollup-plugin-visualizer";
import mkcert from "vite-plugin-mkcert";
import viteCompression from "vite-plugin-compression";
import sass from "sass";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProd = mode === "production";

  return {
    root: "./src",
    base: env.BASE_URL || "/",

    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: true,
      },
      https: true,
    },

    build: {
      outDir: "../dist",
      assetsDir: "assets",
      minify: "esbuild",
      emptyOutDir: true,
      target: ["es2015", "edge88", "firefox78", "chrome87", "safari13"],
      sourcemap: !isProd,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
        },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },

    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@assets": resolve(__dirname, "./src/assets"),
        "@js": resolve(__dirname, "./src/js"),
        "@scss": resolve(__dirname, "./src/scss"),
        "@fa": resolve(
          __dirname,
          "./node_modules/@fortawesome/fontawesome-free"
        ),
        "@components": resolve(__dirname, "./src/components"),
        "@views": resolve(__dirname, "./src/views"),
        "@store": resolve(__dirname, "./src/store"),
        "@utils": resolve(__dirname, "./src/utils"),
      },
    },

    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          implementation: sass,
          additionalData: (source, fp) => {
            if (fp.endsWith("main.scss")) return source;
            return `
              @use "@scss/variables" as *;
              @use "@scss/mixins" as *;
              @use "@fa/scss/fontawesome" as fa;
              @use "@fa/scss/solid" as fa-solid;
              @use "@fa/scss/brands" as fa-brands;
              ${source}
            `;
          },
        },
      },
    },

    optimizeDeps: {
      include: [],
    },

    plugins: [
      mkcert(),
      Icons({
        compiler: "vanilla",
        autoInstall: true,
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  };
});
