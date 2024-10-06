// Import necessary modules and plugins
import { defineConfig, loadEnv } from "vite";
import path from "path";
import mkcert from "vite-plugin-mkcert";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import preloadPlugin from "vite-plugin-preload";
import svgr from "vite-plugin-svgr";
import ViteEnv from "vite-plugin-environment";
import { execSync } from "child_process";

// Export the Vite configuration
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");
  const isProd = mode === "production";
  const isDev = mode === "development";

  // Helper function to resolve file paths
  const resolvePath = (relativePath) => {
    return path.join(__dirname, relativePath).replace(/\\/g, "/");
  };

  return {
    // Set the base URL for the application
    base: env.VITE_BASE || "/",

    // Configure path aliases for easier imports
    resolve: {
      alias: {
        "@": resolvePath("./src"),
        "@assets": resolvePath("./src/assets"),
        "@js": resolvePath("./src/js"),
        "@scss": resolvePath("./src/scss"),
        "@fa-scss": resolvePath(
          "./node_modules/@fortawesome/fontawesome-free/scss"
        ),
        "@fortawesome": resolvePath("./node_modules/@fortawesome"),
      },
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "@fortawesome/fontawesome-free",
        "vite-plugin-mkcert",
        "vite-plugin-compression",
        "rollup-plugin-visualizer",
        "vite-plugin-image-optimizer",
        "vite-plugin-html",
        "vite-plugin-pwa",
        "vite-plugin-eslint",
        "@vitejs/plugin-react",
        "vite-plugin-preload",
      ],
      exclude: [],
    },

    // Configure CSS processing
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          sourceMap: isDev,
          api: "modern-compiler",
          outputStyle: isProd ? "compressed" : "expanded",
        },
      },
      extract: isProd
        ? {
            filename: "css/[name].[contenthash].css",
          }
        : false,
    },

    // Configure plugins
    plugins: [
      // React plugin with fast refresh
      react({
        fastRefresh: true,
      }),
      tsconfigPaths(), // Add TypeScript paths support
      mkcert(), // Generate SSL certificates for local development
      svgr(), // Convert SVGs to React components
      preloadPlugin({
        // Configure preloading of assets
        include: ["js", "css", "fonts", "images"],
        fileWhitelist: [
          /\/js\/main\.js$/,
          /\/main\.css$/,
          /\/assets\/fonts\/Manrope\/.*\.woff2$/,
          /\/assets\/fonts\/Font-Awesome\/.*\.woff2$/,
          /\/assets\/images\/svg\/critical-.*\.svg$/,
        ],
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /\/scss\/(?!main\.scss)/],
        attrWhitelist: ["src", "href"],
        attrBlacklist: ["data-test"],
        includeDynamicImports: true,
        sort: (a, b) => {
          if (a.includes("main.js") || a.includes("main.css")) return -1;
          if (b.includes("main.js") || b.includes("main.css")) return 1;
          return a.localeCompare(b);
        },
      }),
      ViteEnv({
        // Set environment variables
        VITE_APP_TITLE: env.VITE_APP_TITLE,
        VITE_SHORT_APP_TITLE: env.VITE_SHORT_APP_TITLE,
      }),
      viteCompression({
        // Configure Gzip compression
        algorithm: "gzip",
        ext: ".gz",
      }),
      visualizer({
        // Generate bundle size visualization
        filename: resolvePath("./dist/stats.html"),
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
      createHtmlPlugin({
        // Configure HTML generation
        minify: isProd,
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
          tags: [
            // Add meta tags and links to the HTML
            {
              injectTo: "head",
              tag: "meta",
              attrs: {
                "http-equiv": "Content-Security-Policy",
                content:
                  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
              },
            },
            {
              injectTo: "head",
              tag: "link",
              attrs: {
                rel: "icon",
                href: "/favicon.ico",
                sizes: "any",
              },
            },
            {
              injectTo: "head",
              tag: "link",
              attrs: {
                rel: "apple-touch-icon",
                href: "/apple-touch-icon.png",
              },
            },
            {
              injectTo: "head",
              tag: "link",
              attrs: {
                rel: "mask-icon",
                href: "/masked-icon.svg",
                color: "#FFFFFF",
              },
            },
            // Add the script tag for main.js
            {
              // Adding SCSS Javascript
              injectTo: "body",
              tag: "script",
              attrs: {
                type: "module",
                src: "./src/js/main.js",
              },
            },
            {
              // Adding SCSS Javascript Theme JS
              injectTo: "body",
              tag: "script",
              attrs: {
                src: "./src/js/themeSwitch.js",
              },
            },
          ],
        },
      }),

      ViteImageOptimizer({
        // Configure image optimization
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { lossless: false, quality: 90 },
        svg: { multipass: true },
      }),
      VitePWA({
        // Configure Progressive Web App
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
        ],
        manifest: {
          name: env.VITE_APP_TITLE,
          short_name: env.VITE_SHORT_APP_TITLE,
          theme_color: "#ffffff",
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.example\.com\/.*/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
      eslintPlugin({
        // Configure ESLint plugin
        cache: false,
        include: [
          "./src/**/*.js",
          "./src/**/*.jsx",
          "./src/**/*.ts",
          "./src/**/*.tsx",
        ],
        exclude: [],
        failOnError: isProd,
      }),
    ],

    // Configure build options
    build: {
      outDir: env.VITE_OUTPUT_DIR || resolvePath("./dist"),
      assetsDir: env.VITE_ASSETS_DIR || "assets",
      minify: isProd ? "terser" : false,
      terserOptions: isProd
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log"], // Remove console.log calls
            },
            mangle: {
              safari10: true, // for Safari 10 support
            },
          }
        : undefined,
      chunkSizeWarningLimit: 250 * 1024, // 250 kB
      assetsInlineLimit: 256,
      reportCompressedSize: true,
      sourcemap: isDev,
      rollupOptions: {
        output: {
          // Configure output options for Rollup
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "react-vendor";
              }
              if (id.includes("@fortawesome")) {
                return "fontawesome-vendor";
              }
              return "vendor";
            }
          },
          entryFileNames: "js/[name].[hash].js",
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split("/")
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || "[name]";
            return `js/${fileName}.[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            } else if (/woff|woff2/.test(extType)) {
              extType = "fonts";
            } else if (extType === "css") {
              extType = "css";
            }
            return `${extType}/[name].[hash][extname]`;
          },
        },
        external: [], // Add any external dependencies here
      },
      target: ["es2015", "edge88", "firefox78", "chrome87", "safari13.1"],
      cssCodeSplit: true,
      cssTarget: ["chrome61", "firefox60", "safari11", "edge18"],
    },

    // Configure development server options
    server: {
      hmr: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },

    // Define global constants for the app
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __COMMIT_HASH__: JSON.stringify(
        (() => {
          try {
            return execSync("git rev-parse --short HEAD").toString().trim();
          } catch (e) {
            console.warn("Unable to retrieve git commit hash:", e);
            return "unknown";
          }
        })()
      ),
    },
  };
});
