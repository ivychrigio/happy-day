import { Canvas } from "@react-three/fiber";
import "./index.css";
import { Suspense, useEffect, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { BIRTH_DAY_ITEMS } from "./data/brtDayItems";
import { useTranslation } from "react-i18next";
import { Mic, Link as LinkIcon, X } from "lucide-react";
import { readCardFromUrl, isCardExpired } from "./components/Cardlink";
import CreateCard from "./components/Createcard";
import Languages from "./components/Languages";
import Footer from "./components/Footer";
// Se il percorso reale nel tuo progetto è diverso, aggiorna questo import
import useMicrophoneSnuffer from "./hooks/useMic";

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
  const { t, i18n } = useTranslation();
  const [isBlownOut, setIsBlownOut] = useState(false);

  const cardData = readCardFromUrl();
  const cardExpired = cardData ? isCardExpired(cardData) : false;
  const isCreateMode = new URLSearchParams(window.location.search).has(
    "create",
  );

  // applica la lingua salvata nel biglietto custom, se presente
  useEffect(() => {
    if (cardData?.lang) {
      i18n.changeLanguage(cardData.lang);
    }
  }, [cardData?.lang, i18n]);

  const { isListening, startListening, error } = useMicrophoneSnuffer(() => {
    setIsBlownOut(true);
  });

  // il festeggiato da mostrare, solo se non siamo in create mode e il link non è scaduto
  const person =
    !isCreateMode && !cardExpired ? cardData || getTodaysPerson() : null;

  const containerStyle = person
    ? ({ "--bg-color": person.gradient } as React.CSSProperties)
    : undefined;

  return (
    <div className="container" style={containerStyle}>
      <div className="topBar">
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
      </div>

      {cardData && cardExpired && (
        <section>
          <h2>{t("expired_title")}</h2>
          <p>{t("expired_text")}</p>
        </section>
      )}

      {isCreateMode && !cardExpired && <CreateCard />}

      {!isCreateMode && !cardExpired && !person && (
        <section>
          <h2>{t("no_birthday_title")}</h2>
          <p>{t("no_birthday_text")}</p>
        </section>
      )}

      {!isCreateMode && !cardExpired && person && (
        <>
          <section>
            <h1 className="name">{person.name}</h1>

            {"message" in person && person.message && <p>{person.message}</p>}

            {isBlownOut ? (
              <>
                <h2 className="title">{t("result")}</h2>
                <p>{t("result_descr")}</p>
              </>
            ) : (
              <>
                <h2 className="title">{t("title")}</h2>
                <p>{t("description")}</p>
                <button
                  type="button"
                  className="btn"
                  onClick={startListening}
                  disabled={isListening}
                >
                  {isListening ? t("command_listening") : t("command")}
                  <Mic aria-hidden="true" className="inlineHeartIcon" />
                </button>
                {error && (
                  <p className="mic-error">{t(`mic_error_${error}`)}</p>
                )}
              </>
            )}
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
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
