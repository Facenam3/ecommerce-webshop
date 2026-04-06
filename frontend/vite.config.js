import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isGhPages = process.env.VITE_DEPLOY_TARGET === "gh-pages";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isGhPages ? "/ecommerce-webshop/" : "/",
});