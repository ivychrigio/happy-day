import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../data/languages";

export default function Languages() {
  const { i18n } = useTranslation();

  return (
    <div className="languages">
      <Globe aria-hidden="true" className="languagesIcon" />
      <select
        className="languagesSelect"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label="Seleziona lingua"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.code.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
