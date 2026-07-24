import { getCopy } from "@/consts/copy";
import type { Locale } from "@/consts/locale";

/** Page background per theme — kept in sync with src/styles/tokens.css. */
export const themeColors = {
  dark: "#0a0a0b",
  light: "#faf6f1",
} as const;

/**
 * PostHog analytics. The project key is publishable — it ships to every
 * visitor's browser by design — so it lives here as a constant to keep the
 * static GitHub Pages build working without CI secrets. Env vars override it
 * for local or alternate environments. Switch the host to the EU cloud
 * (https://eu.i.posthog.com) if the project lives there.
 */
export const posthog = {
  key: import.meta.env.PUBLIC_POSTHOG_KEY ?? "phc_oC6ZyEKMDGRHUetC7bzBzPWny5wBDoHdqoxSATBP3nXA",
  host: import.meta.env.PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
} as const;

export function getSiteMeta(lang: Locale) {
  const copy = getCopy(lang);
  return {
    title: copy.meta.title,
    description: copy.meta.description,
  } as const;
}
