import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const isProduction = command === "build";

  return {
    base: isProduction ? "./" : "/",
    publicDir: "public",
    root: "public",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "public/index.html"),
          about: resolve(__dirname, "public/about.html"),
          contact: resolve(__dirname, "public/contact.html"),
          products: resolve(__dirname, "public/products.html"),
          "product-detail": resolve(__dirname, "public/product-detail.html"),
          order: resolve(__dirname, "public/order.html"),
        },
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
    server: {
      port: 5173,
      open: true,
      strictPort: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
