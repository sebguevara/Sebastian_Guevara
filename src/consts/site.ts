import { getCopy } from "@/consts/copy";
import type { Locale } from "@/consts/locale";

/** Page background per theme — kept in sync with src/styles/tokens.css. */
export const themeColors = {
  dark: "#0a0a0b",
  light: "#faf6f1",
} as const;

export function getSiteMeta(lang: Locale) {
  const copy = getCopy(lang);
  return {
    title: copy.meta.title,
    description: copy.meta.description,
  } as const;
}
