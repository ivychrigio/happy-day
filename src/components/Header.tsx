import { useTranslation } from "react-i18next";
import Languages from "./Languages";
import { Link as LinkIcon, X } from "lucide-react";

export default function Header({ isCreateMode }: { isCreateMode: boolean }) {
  const { t } = useTranslation();

  return (
    <header className="topBar">
      <Languages />
      {isCreateMode ? (
        <a href="." className="topBarLink">
          <X aria-hidden="true" className="topBarLinkIcon" />
          {t("back_home")}
        </a>
      ) : (
        <a href="?create" className="topBarLink">
          <LinkIcon aria-hidden="true" className="topBarLinkIcon" />
          {t("create_card_cta")}
        </a>
      )}
    </header>
  );
}
