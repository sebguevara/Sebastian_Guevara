export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

/** Narrow Astro.currentLocale (string | undefined) to a known Locale. */
export function getLocale(value: string | undefined): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

/** Prefix a root-relative path with the locale segment when needed. */
export function localizePath(path: string, lang: Locale): string {
  if (lang === defaultLocale) return path;
  return path === "/" ? "/es/" : `/es${path}`;
}

/** Strip the locale prefix, returning the default-locale variant of a path. */
export function delocalizePath(path: string): string {
  return path.replace(/^\/es(\/|$)/, "/");
}
