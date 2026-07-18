import { useState } from "react";
import { useTranslation } from "react-i18next";
import { buildCardUrl } from "./Cardlink";
import { GRADIENT_PRESETS } from "../data/gradients";
import { LANGUAGES } from "../data/languages";

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
    <section className="create-card">
      <h2 className="title">{t("create_title")}</h2>

      <label className="field">
        {t("create_name_label")}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("create_name_placeholder")}
          maxLength={40}
        />
      </label>

      <label className="field">
        {t("create_message_label")}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("create_message_placeholder")}
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
              key={preset.id}
              type="button"
              className={gradient === preset.value ? "swatch active" : "swatch"}
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
  );
}
