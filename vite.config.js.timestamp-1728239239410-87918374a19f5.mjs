// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite/dist/node/index.js";
import path from "path";
import mkcert from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import viteCompression from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-compression/dist/index.mjs";
import { visualizer } from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { ViteImageOptimizer } from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { createHtmlPlugin } from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-html/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-pwa/dist/index.js";
import eslintPlugin from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-eslint/dist/index.mjs";
import react from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-tsconfig-paths/dist/index.js";
import preloadPlugin from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-preload/dist/index.mjs";
import svgr from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-svgr/dist/index.js";
import ViteEnv from "file:///C:/Users/GeorgiSundberg/OneDrive%20-%20Core/Utbildning/.NET/01.HTML-CSS/Silicon-AB/node_modules/vite-plugin-environment/dist/index.js";
import { execSync } from "child_process";
var __vite_injected_original_dirname = "C:\\Users\\GeorgiSundberg\\OneDrive - Core\\Utbildning\\.NET\\01.HTML-CSS\\Silicon-AB";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProd = mode === "production";
  const isDev = mode === "development";
  const resolvePath = (relativePath) => {
    return path.join(__vite_injected_original_dirname, relativePath).replace(/\\/g, "/");
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
        "@fortawesome": resolvePath("./node_modules/@fortawesome")
      }
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
        "vite-plugin-preload"
      ],
      exclude: []
    },
    // Configure CSS processing
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          sourceMap: isDev,
          api: "modern-compiler",
          outputStyle: isProd ? "compressed" : "expanded"
        }
      },
      extract: isProd ? {
        filename: "css/[name].[contenthash].css"
      } : false
    },
    // Configure plugins
    plugins: [
      // React plugin with fast refresh
      react({
        fastRefresh: true
      }),
      tsconfigPaths(),
      // Add TypeScript paths support
      mkcert(),
      // Generate SSL certificates for local development
      svgr(),
      // Convert SVGs to React components
      preloadPlugin({
        // Configure preloading of assets
        include: ["js", "css", "fonts", "images"],
        fileWhitelist: [
          /\/js\/main\.js$/,
          /\/main\.css$/,
          /\/assets\/fonts\/Manrope\/.*\.woff2$/,
          /\/assets\/fonts\/Font-Awesome\/.*\.woff2$/,
          /\/assets\/images\/svg\/critical-.*\.svg$/
        ],
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /\/scss\/(?!main\.scss)/],
        attrWhitelist: ["src", "href"],
        attrBlacklist: ["data-test"],
        includeDynamicImports: true,
        sort: (a, b) => {
          if (a.includes("main.js") || a.includes("main.css")) return -1;
          if (b.includes("main.js") || b.includes("main.css")) return 1;
          return a.localeCompare(b);
        }
      }),
      ViteEnv({
        // Set environment variables
        VITE_APP_TITLE: env.VITE_APP_TITLE,
        VITE_SHORT_APP_TITLE: env.VITE_SHORT_APP_TITLE
      }),
      viteCompression({
        // Configure Gzip compression
        algorithm: "gzip",
        ext: ".gz"
      }),
      visualizer({
        // Generate bundle size visualization
        filename: resolvePath("./dist/stats.html"),
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      createHtmlPlugin({
        // Configure HTML generation
        minify: isProd,
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          },
          tags: [
            // Add meta tags and links to the HTML
            {
              injectTo: "head",
              tag: "meta",
              attrs: {
                "http-equiv": "Content-Security-Policy",
                content: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;"
              }
            },
            {
              injectTo: "head",
              tag: "link",
              attrs: {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Lato&display=swap"
              }
            },
            {
              injectTo: "head",
              tag: "link",
              attrs: {
                rel: "icon",
                href: "/favicon.ico",
                sizes: "any"
              }
            },
            {
              injectTo: "head",
              tag: "link",
              attrs: {
                rel: "apple-touch-icon",
                href: "/apple-touch-icon.png"
              }
            },
            {
              injectTo: "head",
              tag: "link",
              attrs: {
                rel: "mask-icon",
                href: "/masked-icon.svg",
                color: "#FFFFFF"
              }
            },
            // Add the script tag for main.js
            {
              // Adding SCSS Javascript
              injectTo: "body",
              tag: "script",
              attrs: {
                type: "module",
                src: "./src/js/main.js"
              }
            },
            {
              // Adding SCSS Javascript Theme JS
              injectTo: "body",
              tag: "script",
              attrs: {
                type: "module",
                src: "./src/js/themeSwitch.js"
              }
            }
          ]
        }
      }),
      ViteImageOptimizer({
        // Configure image optimization
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { lossless: false, quality: 90 },
        svg: { multipass: true }
      }),
      VitePWA({
        // Configure Progressive Web App
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg"
        ],
        /// THIS IS IN PROGRESS, WILL TAKE CARE OF THIS LATER
        manifest: {
          name: env.VITE_APP_TITLE,
          short_name: env.VITE_SHORT_APP_TITLE,
          theme_color: "#ffffff",
          icons: [
            {
              src: "./android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "./android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png"
            }
          ]
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
                  maxAgeSeconds: 60 * 60 * 24 * 7
                  // 1 week
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      }),
      eslintPlugin({
        // Configure ESLint plugin
        cache: false,
        include: [
          "./src/**/*.js",
          "./src/**/*.jsx",
          "./src/**/*.ts",
          "./src/**/*.tsx"
        ],
        exclude: [],
        failOnError: isProd
      })
    ],
    // Configure build options
    build: {
      outDir: env.VITE_OUTPUT_DIR || resolvePath("./dist"),
      assetsDir: env.VITE_ASSETS_DIR || "assets",
      minify: isProd ? "terser" : false,
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"]
          // Remove console.log calls
        },
        mangle: {
          safari10: true
          // for Safari 10 support
        }
      } : void 0,
      chunkSizeWarningLimit: 250 * 1024,
      // 250 kB
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
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/") : [];
            const fileName = facadeModuleId[facadeModuleId.length - 2] || "[name]";
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
          }
        },
        external: []
        // Add any external dependencies here
      },
      target: ["es2015", "edge88", "firefox78", "chrome87", "safari13.1"],
      cssCodeSplit: true,
      cssTarget: ["chrome61", "firefox60", "safari11", "edge18"]
    },
    // Configure development server options
    server: {
      hmr: {
        overlay: {
          errors: true,
          warnings: false
        }
      }
    },
    // Define global constants for the app
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify((/* @__PURE__ */ new Date()).toISOString()),
      __COMMIT_HASH__: JSON.stringify(
        (() => {
          try {
            return execSync("git rev-parse --short HEAD").toString().trim();
          } catch (e) {
            console.warn("Unable to retrieve git commit hash:", e);
            return "unknown";
          }
        })()
      )
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxHZW9yZ2lTdW5kYmVyZ1xcXFxPbmVEcml2ZSAtIENvcmVcXFxcVXRiaWxkbmluZ1xcXFwuTkVUXFxcXDAxLkhUTUwtQ1NTXFxcXFNpbGljb24tQUJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEdlb3JnaVN1bmRiZXJnXFxcXE9uZURyaXZlIC0gQ29yZVxcXFxVdGJpbGRuaW5nXFxcXC5ORVRcXFxcMDEuSFRNTC1DU1NcXFxcU2lsaWNvbi1BQlxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvR2VvcmdpU3VuZGJlcmcvT25lRHJpdmUlMjAtJTIwQ29yZS9VdGJpbGRuaW5nLy5ORVQvMDEuSFRNTC1DU1MvU2lsaWNvbi1BQi92aXRlLmNvbmZpZy5qc1wiOy8vIEltcG9ydCBuZWNlc3NhcnkgbW9kdWxlcyBhbmQgcGx1Z2luc1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgbWtjZXJ0IGZyb20gXCJ2aXRlLXBsdWdpbi1ta2NlcnRcIjtcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcclxuaW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSBcInZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHByZWxvYWRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLXByZWxvYWRcIjtcclxuaW1wb3J0IHN2Z3IgZnJvbSBcInZpdGUtcGx1Z2luLXN2Z3JcIjtcclxuaW1wb3J0IFZpdGVFbnYgZnJvbSBcInZpdGUtcGx1Z2luLWVudmlyb25tZW50XCI7XHJcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbi8vIEV4cG9ydCB0aGUgVml0ZSBjb25maWd1cmF0aW9uXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICAvLyBMb2FkIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XHJcbiAgY29uc3QgaXNQcm9kID0gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbiAgY29uc3QgaXNEZXYgPSBtb2RlID09PSBcImRldmVsb3BtZW50XCI7XHJcblxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byByZXNvbHZlIGZpbGUgcGF0aHNcclxuICBjb25zdCByZXNvbHZlUGF0aCA9IChyZWxhdGl2ZVBhdGgpID0+IHtcclxuICAgIHJldHVybiBwYXRoLmpvaW4oX19kaXJuYW1lLCByZWxhdGl2ZVBhdGgpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAvLyBTZXQgdGhlIGJhc2UgVVJMIGZvciB0aGUgYXBwbGljYXRpb25cclxuICAgIGJhc2U6IGVudi5WSVRFX0JBU0UgfHwgXCIvXCIsXHJcblxyXG4gICAgLy8gQ29uZmlndXJlIHBhdGggYWxpYXNlcyBmb3IgZWFzaWVyIGltcG9ydHNcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcmVzb2x2ZVBhdGgoXCIuL3NyY1wiKSxcclxuICAgICAgICBcIkBhc3NldHNcIjogcmVzb2x2ZVBhdGgoXCIuL3NyYy9hc3NldHNcIiksXHJcbiAgICAgICAgXCJAanNcIjogcmVzb2x2ZVBhdGgoXCIuL3NyYy9qc1wiKSxcclxuICAgICAgICBcIkBzY3NzXCI6IHJlc29sdmVQYXRoKFwiLi9zcmMvc2Nzc1wiKSxcclxuICAgICAgICBcIkBmYS1zY3NzXCI6IHJlc29sdmVQYXRoKFxyXG4gICAgICAgICAgXCIuL25vZGVfbW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9zY3NzXCJcclxuICAgICAgICApLFxyXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lXCI6IHJlc29sdmVQYXRoKFwiLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBPcHRpbWl6ZSBkZXBlbmRlbmNpZXNcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgXCJyZWFjdFwiLFxyXG4gICAgICAgIFwicmVhY3QtZG9tXCIsXHJcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZVwiLFxyXG4gICAgICAgIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCIsXHJcbiAgICAgICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiLFxyXG4gICAgICAgIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCIsXHJcbiAgICAgICAgXCJ2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXJcIixcclxuICAgICAgICBcInZpdGUtcGx1Z2luLWh0bWxcIixcclxuICAgICAgICBcInZpdGUtcGx1Z2luLXB3YVwiLFxyXG4gICAgICAgIFwidml0ZS1wbHVnaW4tZXNsaW50XCIsXHJcbiAgICAgICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiLFxyXG4gICAgICAgIFwidml0ZS1wbHVnaW4tcHJlbG9hZFwiLFxyXG4gICAgICBdLFxyXG4gICAgICBleGNsdWRlOiBbXSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ29uZmlndXJlIENTUyBwcm9jZXNzaW5nXHJcbiAgICBjc3M6IHtcclxuICAgICAgZGV2U291cmNlbWFwOiB0cnVlLFxyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgc291cmNlTWFwOiBpc0RldixcclxuICAgICAgICAgIGFwaTogXCJtb2Rlcm4tY29tcGlsZXJcIixcclxuICAgICAgICAgIG91dHB1dFN0eWxlOiBpc1Byb2QgPyBcImNvbXByZXNzZWRcIiA6IFwiZXhwYW5kZWRcIixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBleHRyYWN0OiBpc1Byb2RcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgZmlsZW5hbWU6IFwiY3NzL1tuYW1lXS5bY29udGVudGhhc2hdLmNzc1wiLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogZmFsc2UsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENvbmZpZ3VyZSBwbHVnaW5zXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIC8vIFJlYWN0IHBsdWdpbiB3aXRoIGZhc3QgcmVmcmVzaFxyXG4gICAgICByZWFjdCh7XHJcbiAgICAgICAgZmFzdFJlZnJlc2g6IHRydWUsXHJcbiAgICAgIH0pLFxyXG4gICAgICB0c2NvbmZpZ1BhdGhzKCksIC8vIEFkZCBUeXBlU2NyaXB0IHBhdGhzIHN1cHBvcnRcclxuICAgICAgbWtjZXJ0KCksIC8vIEdlbmVyYXRlIFNTTCBjZXJ0aWZpY2F0ZXMgZm9yIGxvY2FsIGRldmVsb3BtZW50XHJcbiAgICAgIHN2Z3IoKSwgLy8gQ29udmVydCBTVkdzIHRvIFJlYWN0IGNvbXBvbmVudHNcclxuICAgICAgcHJlbG9hZFBsdWdpbih7XHJcbiAgICAgICAgLy8gQ29uZmlndXJlIHByZWxvYWRpbmcgb2YgYXNzZXRzXHJcbiAgICAgICAgaW5jbHVkZTogW1wianNcIiwgXCJjc3NcIiwgXCJmb250c1wiLCBcImltYWdlc1wiXSxcclxuICAgICAgICBmaWxlV2hpdGVsaXN0OiBbXHJcbiAgICAgICAgICAvXFwvanNcXC9tYWluXFwuanMkLyxcclxuICAgICAgICAgIC9cXC9tYWluXFwuY3NzJC8sXHJcbiAgICAgICAgICAvXFwvYXNzZXRzXFwvZm9udHNcXC9NYW5yb3BlXFwvLipcXC53b2ZmMiQvLFxyXG4gICAgICAgICAgL1xcL2Fzc2V0c1xcL2ZvbnRzXFwvRm9udC1Bd2Vzb21lXFwvLipcXC53b2ZmMiQvLFxyXG4gICAgICAgICAgL1xcL2Fzc2V0c1xcL2ltYWdlc1xcL3N2Z1xcL2NyaXRpY2FsLS4qXFwuc3ZnJC8sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBmaWxlQmxhY2tsaXN0OiBbL1xcLm1hcCQvLCAvaG90LXVwZGF0ZVxcLmpzJC8sIC9cXC9zY3NzXFwvKD8hbWFpblxcLnNjc3MpL10sXHJcbiAgICAgICAgYXR0cldoaXRlbGlzdDogW1wic3JjXCIsIFwiaHJlZlwiXSxcclxuICAgICAgICBhdHRyQmxhY2tsaXN0OiBbXCJkYXRhLXRlc3RcIl0sXHJcbiAgICAgICAgaW5jbHVkZUR5bmFtaWNJbXBvcnRzOiB0cnVlLFxyXG4gICAgICAgIHNvcnQ6IChhLCBiKSA9PiB7XHJcbiAgICAgICAgICBpZiAoYS5pbmNsdWRlcyhcIm1haW4uanNcIikgfHwgYS5pbmNsdWRlcyhcIm1haW4uY3NzXCIpKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICBpZiAoYi5pbmNsdWRlcyhcIm1haW4uanNcIikgfHwgYi5pbmNsdWRlcyhcIm1haW4uY3NzXCIpKSByZXR1cm4gMTtcclxuICAgICAgICAgIHJldHVybiBhLmxvY2FsZUNvbXBhcmUoYik7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIFZpdGVFbnYoe1xyXG4gICAgICAgIC8vIFNldCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuICAgICAgICBWSVRFX0FQUF9USVRMRTogZW52LlZJVEVfQVBQX1RJVExFLFxyXG4gICAgICAgIFZJVEVfU0hPUlRfQVBQX1RJVExFOiBlbnYuVklURV9TSE9SVF9BUFBfVElUTEUsXHJcbiAgICAgIH0pLFxyXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICAgIC8vIENvbmZpZ3VyZSBHemlwIGNvbXByZXNzaW9uXHJcbiAgICAgICAgYWxnb3JpdGhtOiBcImd6aXBcIixcclxuICAgICAgICBleHQ6IFwiLmd6XCIsXHJcbiAgICAgIH0pLFxyXG4gICAgICB2aXN1YWxpemVyKHtcclxuICAgICAgICAvLyBHZW5lcmF0ZSBidW5kbGUgc2l6ZSB2aXN1YWxpemF0aW9uXHJcbiAgICAgICAgZmlsZW5hbWU6IHJlc29sdmVQYXRoKFwiLi9kaXN0L3N0YXRzLmh0bWxcIiksXHJcbiAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcclxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxyXG4gICAgICB9KSxcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgLy8gQ29uZmlndXJlIEhUTUwgZ2VuZXJhdGlvblxyXG4gICAgICAgIG1pbmlmeTogaXNQcm9kLFxyXG4gICAgICAgIGluamVjdDoge1xyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0aXRsZTogZW52LlZJVEVfQVBQX1RJVExFLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRhZ3M6IFtcclxuICAgICAgICAgICAgLy8gQWRkIG1ldGEgdGFncyBhbmQgbGlua3MgdG8gdGhlIEhUTUxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGluamVjdFRvOiBcImhlYWRcIixcclxuICAgICAgICAgICAgICB0YWc6IFwibWV0YVwiLFxyXG4gICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICBcImh0dHAtZXF1aXZcIjogXCJDb250ZW50LVNlY3VyaXR5LVBvbGljeVwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDpcclxuICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0LXNyYyAnc2VsZic7IHNjcmlwdC1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJzsgc3R5bGUtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbTsgZm9udC1zcmMgJ3NlbGYnIGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb207IGltZy1zcmMgJ3NlbGYnIGRhdGE6O1wiLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpbmplY3RUbzogXCJoZWFkXCIsXHJcbiAgICAgICAgICAgICAgdGFnOiBcImxpbmtcIixcclxuICAgICAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcclxuICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1MYXRvJmRpc3BsYXk9c3dhcFwiLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaW5qZWN0VG86IFwiaGVhZFwiLFxyXG4gICAgICAgICAgICAgIHRhZzogXCJsaW5rXCIsXHJcbiAgICAgICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgICAgIHJlbDogXCJpY29uXCIsXHJcbiAgICAgICAgICAgICAgICBocmVmOiBcIi9mYXZpY29uLmljb1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiYW55XCIsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGluamVjdFRvOiBcImhlYWRcIixcclxuICAgICAgICAgICAgICB0YWc6IFwibGlua1wiLFxyXG4gICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICByZWw6IFwiYXBwbGUtdG91Y2gtaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgaHJlZjogXCIvYXBwbGUtdG91Y2gtaWNvbi5wbmdcIixcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaW5qZWN0VG86IFwiaGVhZFwiLFxyXG4gICAgICAgICAgICAgIHRhZzogXCJsaW5rXCIsXHJcbiAgICAgICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgICAgIHJlbDogXCJtYXNrLWljb25cIixcclxuICAgICAgICAgICAgICAgIGhyZWY6IFwiL21hc2tlZC1pY29uLnN2Z1wiLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0ZGRkZGRlwiLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgc2NyaXB0IHRhZyBmb3IgbWFpbi5qc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgLy8gQWRkaW5nIFNDU1MgSmF2YXNjcmlwdFxyXG4gICAgICAgICAgICAgIGluamVjdFRvOiBcImJvZHlcIixcclxuICAgICAgICAgICAgICB0YWc6IFwic2NyaXB0XCIsXHJcbiAgICAgICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwibW9kdWxlXCIsXHJcbiAgICAgICAgICAgICAgICBzcmM6IFwiLi9zcmMvanMvbWFpbi5qc1wiLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAvLyBBZGRpbmcgU0NTUyBKYXZhc2NyaXB0IFRoZW1lIEpTXHJcbiAgICAgICAgICAgICAgaW5qZWN0VG86IFwiYm9keVwiLFxyXG4gICAgICAgICAgICAgIHRhZzogXCJzY3JpcHRcIixcclxuICAgICAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJtb2R1bGVcIixcclxuICAgICAgICAgICAgICAgIHNyYzogXCIuL3NyYy9qcy90aGVtZVN3aXRjaC5qc1wiLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgVml0ZUltYWdlT3B0aW1pemVyKHtcclxuICAgICAgICAvLyBDb25maWd1cmUgaW1hZ2Ugb3B0aW1pemF0aW9uXHJcbiAgICAgICAgcG5nOiB7IHF1YWxpdHk6IDgwIH0sXHJcbiAgICAgICAganBlZzogeyBxdWFsaXR5OiA4MCB9LFxyXG4gICAgICAgIGpwZzogeyBxdWFsaXR5OiA4MCB9LFxyXG4gICAgICAgIHdlYnA6IHsgbG9zc2xlc3M6IGZhbHNlLCBxdWFsaXR5OiA5MCB9LFxyXG4gICAgICAgIHN2ZzogeyBtdWx0aXBhc3M6IHRydWUgfSxcclxuICAgICAgfSksXHJcbiAgICAgIFZpdGVQV0Eoe1xyXG4gICAgICAgIC8vIENvbmZpZ3VyZSBQcm9ncmVzc2l2ZSBXZWIgQXBwXHJcbiAgICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcclxuICAgICAgICBpbmNsdWRlQXNzZXRzOiBbXHJcbiAgICAgICAgICBcImZhdmljb24uaWNvXCIsXHJcbiAgICAgICAgICBcImFwcGxlLXRvdWNoLWljb24ucG5nXCIsXHJcbiAgICAgICAgICBcIm1hc2tlZC1pY29uLnN2Z1wiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgLy8vIFRISVMgSVMgSU4gUFJPR1JFU1MsIFdJTEwgVEFLRSBDQVJFIE9GIFRISVMgTEFURVJcclxuICAgICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgICAgbmFtZTogZW52LlZJVEVfQVBQX1RJVExFLFxyXG4gICAgICAgICAgc2hvcnRfbmFtZTogZW52LlZJVEVfU0hPUlRfQVBQX1RJVExFLFxyXG4gICAgICAgICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHNyYzogXCIuL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nXCIsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBzcmM6IFwiLi9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmd9XCJdLFxyXG4gICAgICAgICAgcnVudGltZUNhY2hpbmc6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvYXBpXFwuZXhhbXBsZVxcLmNvbVxcLy4qL2ksXHJcbiAgICAgICAgICAgICAgaGFuZGxlcjogXCJOZXR3b3JrRmlyc3RcIixcclxuICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZU5hbWU6IFwiYXBpLWNhY2hlXCIsXHJcbiAgICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxyXG4gICAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiA3LCAvLyAxIHdlZWtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZToge1xyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBlc2xpbnRQbHVnaW4oe1xyXG4gICAgICAgIC8vIENvbmZpZ3VyZSBFU0xpbnQgcGx1Z2luXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIFwiLi9zcmMvKiovKi5qc1wiLFxyXG4gICAgICAgICAgXCIuL3NyYy8qKi8qLmpzeFwiLFxyXG4gICAgICAgICAgXCIuL3NyYy8qKi8qLnRzXCIsXHJcbiAgICAgICAgICBcIi4vc3JjLyoqLyoudHN4XCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBleGNsdWRlOiBbXSxcclxuICAgICAgICBmYWlsT25FcnJvcjogaXNQcm9kLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcblxyXG4gICAgLy8gQ29uZmlndXJlIGJ1aWxkIG9wdGlvbnNcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogZW52LlZJVEVfT1VUUFVUX0RJUiB8fCByZXNvbHZlUGF0aChcIi4vZGlzdFwiKSxcclxuICAgICAgYXNzZXRzRGlyOiBlbnYuVklURV9BU1NFVFNfRElSIHx8IFwiYXNzZXRzXCIsXHJcbiAgICAgIG1pbmlmeTogaXNQcm9kID8gXCJ0ZXJzZXJcIiA6IGZhbHNlLFxyXG4gICAgICB0ZXJzZXJPcHRpb25zOiBpc1Byb2RcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICBwdXJlX2Z1bmNzOiBbXCJjb25zb2xlLmxvZ1wiXSwgLy8gUmVtb3ZlIGNvbnNvbGUubG9nIGNhbGxzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hbmdsZToge1xyXG4gICAgICAgICAgICAgIHNhZmFyaTEwOiB0cnVlLCAvLyBmb3IgU2FmYXJpIDEwIHN1cHBvcnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH1cclxuICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyNTAgKiAxMDI0LCAvLyAyNTAga0JcclxuICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDI1NixcclxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXHJcbiAgICAgIHNvdXJjZW1hcDogaXNEZXYsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIC8vIENvbmZpZ3VyZSBvdXRwdXQgb3B0aW9ucyBmb3IgUm9sbHVwXHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcclxuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJyZWFjdFwiKSB8fCBpZC5pbmNsdWRlcyhcInJlYWN0LWRvbVwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicmVhY3QtdmVuZG9yXCI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkBmb3J0YXdlc29tZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZm9udGF3ZXNvbWUtdmVuZG9yXCI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvclwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwianMvW25hbWVdLltoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmFjYWRlTW9kdWxlSWQgPSBjaHVua0luZm8uZmFjYWRlTW9kdWxlSWRcclxuICAgICAgICAgICAgICA/IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZC5zcGxpdChcIi9cIilcclxuICAgICAgICAgICAgICA6IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9XHJcbiAgICAgICAgICAgICAgZmFjYWRlTW9kdWxlSWRbZmFjYWRlTW9kdWxlSWQubGVuZ3RoIC0gMl0gfHwgXCJbbmFtZV1cIjtcclxuICAgICAgICAgICAgcmV0dXJuIGBqcy8ke2ZpbGVOYW1lfS5baGFzaF0uanNgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBhc3NldEluZm8ubmFtZS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICAgIGxldCBleHRUeXBlID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAoL3BuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljby9pLnRlc3QoZXh0VHlwZSkpIHtcclxuICAgICAgICAgICAgICBleHRUeXBlID0gXCJpbWdcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgvd29mZnx3b2ZmMi8udGVzdChleHRUeXBlKSkge1xyXG4gICAgICAgICAgICAgIGV4dFR5cGUgPSBcImZvbnRzXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXh0VHlwZSA9PT0gXCJjc3NcIikge1xyXG4gICAgICAgICAgICAgIGV4dFR5cGUgPSBcImNzc1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtleHRUeXBlfS9bbmFtZV0uW2hhc2hdW2V4dG5hbWVdYDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBleHRlcm5hbDogW10sIC8vIEFkZCBhbnkgZXh0ZXJuYWwgZGVwZW5kZW5jaWVzIGhlcmVcclxuICAgICAgfSxcclxuICAgICAgdGFyZ2V0OiBbXCJlczIwMTVcIiwgXCJlZGdlODhcIiwgXCJmaXJlZm94NzhcIiwgXCJjaHJvbWU4N1wiLCBcInNhZmFyaTEzLjFcIl0sXHJcbiAgICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcclxuICAgICAgY3NzVGFyZ2V0OiBbXCJjaHJvbWU2MVwiLCBcImZpcmVmb3g2MFwiLCBcInNhZmFyaTExXCIsIFwiZWRnZTE4XCJdLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDb25maWd1cmUgZGV2ZWxvcG1lbnQgc2VydmVyIG9wdGlvbnNcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBobXI6IHtcclxuICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICBlcnJvcnM6IHRydWUsXHJcbiAgICAgICAgICB3YXJuaW5nczogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRGVmaW5lIGdsb2JhbCBjb25zdGFudHMgZm9yIHRoZSBhcHBcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX0FQUF9WRVJTSU9OX186IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb24pLFxyXG4gICAgICBfX0JVSUxEX1RJTUVfXzogSlNPTi5zdHJpbmdpZnkobmV3IERhdGUoKS50b0lTT1N0cmluZygpKSxcclxuICAgICAgX19DT01NSVRfSEFTSF9fOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4ZWNTeW5jKFwiZ2l0IHJldi1wYXJzZSAtLXNob3J0IEhFQURcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byByZXRyaWV2ZSBnaXQgY29tbWl0IGhhc2g6XCIsIGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ1bmtub3duXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKVxyXG4gICAgICApLFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxxQkFBcUI7QUFDNUIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFVBQVU7QUFDakIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsZ0JBQWdCO0FBZnpCLElBQU0sbUNBQW1DO0FBa0J6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUV4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxTQUFTLFNBQVM7QUFDeEIsUUFBTSxRQUFRLFNBQVM7QUFHdkIsUUFBTSxjQUFjLENBQUMsaUJBQWlCO0FBQ3BDLFdBQU8sS0FBSyxLQUFL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
