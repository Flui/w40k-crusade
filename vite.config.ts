import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/w40k-crusade",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        icons: [{ src: "/w40k-crusade/vite.svg", type: "image/svg+xml", sizes: "144x144" }],
        theme_color: "#2478a0",
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
