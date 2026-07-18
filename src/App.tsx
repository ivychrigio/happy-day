import { Canvas } from "@react-three/fiber";
import "./index.css";
import { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { BIRTH_DAY_ITEMS } from "./data/brtDayItems";
import { useTranslation } from "react-i18next";
import { Cake, Smile, Award } from "lucide-react";
import Divider from "./Divider";

function Model() {
  const { scene } = useGLTF("/muffin.glb");
  return <primitive object={scene} position={[0, -0.6, 0]} />;
}

function getTodaysPerson() {
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  return BIRTH_DAY_ITEMS.find((person) => {
    const [, month, day] = person.birthDate.split("-").map(Number);
    return month === todayMonth && day === todayDay;
  });
}

function App() {
  const { t } = useTranslation();
  const person = getTodaysPerson();

  if (!person) {
    return (
      <div className="container">
        <section>
          <h2>{t("no_birthday_title")}</h2>
          <p>{t("no_birthday_text")}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="container" style={{ "--bg-color": person.gradient }}>
      <section>
        <h1 className="name">{person.name}</h1>
        <h2 className="title">{t("title")}</h2>
        <p>{t("description")}</p>
        <button type="button" className="btn">
          {t("command")}
        </button>
      </section>
      <div className="canvas-wrapper">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 35 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <footer>
        <div className="footer">
          <div className="footerContainer">
            <Divider icon={Cake} />

            <p className="copyright">
              &copy; {new Date().getFullYear()} Happy day &mdash;{" "}
              {t("copyright")}
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
    </div>
  );
}

export default App;
