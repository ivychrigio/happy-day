import { Canvas } from "@react-three/fiber";
import "./index.css";
import { Suspense, useEffect, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { BIRTH_DAY_ITEMS } from "./data/brtDayItems";
import { useTranslation } from "react-i18next";
import { Mic } from "lucide-react";
import { readCardFromUrl, isCardExpired } from "./components/Cardlink";
import CreateCard from "./components/Createcard";
import Footer from "./components/Footer";
import useMicrophoneSnuffer from "./hooks/useMic";
import Header from "./components/Header";
import FallingPetals from "./components/FallingPetals";

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

  useEffect(() => {
    if (cardData?.lang) {
      i18n.changeLanguage(cardData.lang);
    }
  }, [cardData?.lang, i18n]);

  const { isListening, startListening, error } = useMicrophoneSnuffer(() => {
    setIsBlownOut(true);
  });

  const person =
    !isCreateMode && !cardExpired ? cardData || getTodaysPerson() : null;

  const containerStyle = person
    ? ({ "--bg-color": person.gradient } as React.CSSProperties)
    : undefined;

  return (
    <>
      <div className="container" style={containerStyle}>
        <Header isCreateMode={isCreateMode} />

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
                  <button
                    type="button"
                    className="btn"
                    onClick={startListening}
                    disabled={isListening}
                  >
                    {isListening ? t("command") : t("description")}
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
                  {!isBlownOut && <Model />}
                  {isBlownOut && <FallingPetals />}
                </Suspense>
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
          </>
        )}
      </div>

      <Footer style={containerStyle} />
    </>
  );
}

export default App;
