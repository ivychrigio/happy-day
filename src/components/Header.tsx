import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Languages from "./Languages";
import { Link as LinkIcon, X } from "lucide-react";

export default function Header({
  showLanguages = true,
}: {
  showLanguages?: boolean;
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const isCreateMode = location.pathname === "/create";

  return (
    <header className="topBar">
      {showLanguages ? <Languages /> : <div />}
      {isCreateMode ? (
        <Link to="/" className="topBarLink">
          <X aria-hidden="true" className="topBarLinkIcon" />
          {t("back_home")}
        </Link>
      ) : (
        <Link to="/create" className="topBarLink">
          <LinkIcon aria-hidden="true" className="topBarLinkIcon" />
          {t("create_card_cta")}
        </Link>
      )}
    </header>
  );
}
