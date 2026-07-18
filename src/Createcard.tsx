import { useState } from "react";
import { useTranslation } from "react-i18next";
import { buildCardUrl } from "./cardLink";

const GRADIENT_PRESETS = [
  {
    label: "Fuxia",
    value: `radial-gradient(at 0% 0%, rgba(255, 20, 147, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 182, 193, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 105, 180, 0.8) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 215, 0, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #ffd6e8 0%, #fff5f9 100%)`,
  },
  {
    label: "Giallo caldo",
    value: `radial-gradient(at 0% 0%, rgba(255, 213, 0, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 154, 0, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 126, 95, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 235, 59, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #ffefba 0%, #fffdf0 100%)`,
  },
  {
    label: "Celeste",
    value: `radial-gradient(at 0% 0%, rgba(135, 206, 235, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(74, 144, 217, 0.6) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(179, 157, 219, 0.6) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(200, 230, 255, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #dff3ff 0%, #f5fbff 100%)`,
  },
  {
    label: "Verde",
    value: `radial-gradient(at 0% 0%, rgba(76, 175, 80, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(168, 224, 99, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(0, 191, 165, 0.6) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(205, 220, 57, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #e0f7dc 0%, #f4fff0 100%)`,
  },
];

const LANGUAGES = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export default function CreateCard() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [gradient, setGradient] = useState(GRADIENT_PRESETS[0].value);
  const [lang, setLang] = useState("it");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!name.trim()) return;
    const url = buildCardUrl({
      name: name.trim(),
      message: message.trim(),
      gradient,
      lang,
    });
    setLink(url);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <section className="create-card">
        <h2 className="title">{t("create_title")}</h2>

        <label className="field">
          {t("create_name_label")}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="es. Marco"
            maxLength={40}
          />
        </label>

        <label className="field">
          {t("create_message_label")}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tanti auguri!"
            maxLength={200}
          />
        </label>

        <label className="field">
          {t("create_lang_label")}
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>

        <div className="field">
          <span>{t("create_color_label")}</span>
          <div className="gradient-picker">
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={
                  gradient === preset.value ? "swatch active" : "swatch"
                }
                style={{ background: preset.value }}
                onClick={() => setGradient(preset.value)}
                title={preset.label}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn"
          onClick={handleGenerate}
          disabled={!name.trim()}
        >
          {t("create_generate_btn")}
        </button>

        {link && (
          <div className="link-result">
            <p>{t("create_expiry_note")}</p>
            <input
              type="text"
              value={link}
              readOnly
              onFocus={(e) => e.target.select()}
            />
            <button type="button" className="btn" onClick={handleCopy}>
              {copied ? t("create_copied_btn") : t("create_copy_btn")}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
