import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./languages/en";
import translationIT from "./languages/it";
import translationFR from "./languages/fr";
import translationES from "./languages/es";

const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
  fr: {
    translation: translationFR,
  },
  es: {
    translation: translationES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "it",
  fallbackLng: "it",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
