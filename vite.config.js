import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-social-media-embed"],
  },
  define: {
    "require.resolve": undefined, // Evita errores por llamadas a require()
    global: "window", // Algunos paquetes buscan 'global'
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Permite transformar código híbrido CJS/ESM
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@emotion/react", "@emotion/styled"],
          swiper: ["swiper"],
          supabase: ["@supabase/supabase-js"],
          social: ["react-social-media-embed"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  base: "./",
});