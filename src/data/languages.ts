import type { LanguageOption } from "../interfaces/languageOption";

export const LANGUAGES: LanguageOption[] = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export const SUPPORTED_LANG_CODES = LANGUAGES.map((lang) => lang.code);
