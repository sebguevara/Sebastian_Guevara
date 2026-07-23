import type { Locale } from "@/consts/locale";

export type LocalizedString = string | Partial<Record<Locale, string>>;

/** Resolve a bilingual CV field to the requested locale. */
export function t(value: LocalizedString | null | undefined, lang: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? value.es ?? "";
}

export function tOptional(
  value: LocalizedString | null | undefined,
  lang: Locale,
): string | undefined {
  const resolved = t(value, lang);
  return resolved || undefined;
}

export function tList(
  values: LocalizedString[] | null | undefined,
  lang: Locale,
): string[] {
  return (values ?? []).map((value) => t(value, lang));
}
