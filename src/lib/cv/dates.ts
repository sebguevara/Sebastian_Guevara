import type { Locale } from "@/consts/locale";

const intlByLocale: Record<Locale, string> = { en: "en-US", es: "es-AR" };

/** "2024-02" → "Feb 2024" / "Feb 2024". Unknown formats pass through. */
export function formatMonth(iso: string, lang: Locale): string {
  const match = /^(\d{4})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month] = match;
  const formatted = new Intl.DateTimeFormat(intlByLocale[lang], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
  // Drop trailing dots from some locales ("ene." → "ene") and tidy separators.
  return formatted
    .replace(/\./g, "")
    .replace(/\s+de\s+/i, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

/** Whole years elapsed since an ISO "YYYY-MM" date (evaluated at build time). */
export function yearsSince(iso: string): number {
  const start = new Date(`${iso}-01T00:00:00Z`).getTime();
  if (Number.isNaN(start)) return 0;
  const ms = Date.now() - start;
  return Math.max(0, Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000)));
}
