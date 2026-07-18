import { Cake, Smile, Award } from "lucide-react";
import Divider from "./Divider";
import { useTranslation } from "react-i18next";

export default function Footer({ style }: { style?: React.CSSProperties }) {
  const { t } = useTranslation();

  return (
    <footer style={style}>
      <div className="footer">
        <div className="footerContainer">
          <Divider icon={Cake} />

          <p className="copyright">
            &copy; {new Date().getFullYear()} Happy day &mdash; {t("copyright")}
          </p>

          <p className="craftedWith">
            {t("craftedWith")}{" "}
            <Smile aria-hidden="true" className="inlineHeartIcon" />
          </p>

          <Divider icon={Award} compact />

          <p className="devCredit">
            {t("devCredit")}
            <a
              href="https://ivychrigio.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ivychrigio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
