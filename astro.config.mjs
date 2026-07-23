import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// TODO: replace with the final custom domain when purchased.
const SITE = "https://sebguevara.github.io";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: "static",
  compressHTML: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
