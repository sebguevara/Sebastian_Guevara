import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// Primary portfolio domain (also listed on the CV).
const SITE = "https://sebguevara.site";

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
  integrations: [sitemap({
    i18n: {
      defaultLocale: "en",
      locales: { en: "en", es: "es" },
    },
  }), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});