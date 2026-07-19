import { Canvas } from "@react-three/fiber";
import "./index.css";
import { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import { Mic } from "lucide-react";
import { BIRTH_DAY_ITEMS } from "./data/brtDayItems";
import { TEXT_COLORS } from "./data/gradients";
import { readCardFromUrl, isCardExpired } from "./components/Cardlink";
import CreateCard from "./components/Createcard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FallingPetals from "./components/FallingPetals";
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

function getGradientId(person: any): string | undefined {
  return person?.gradientId ?? person?.style;
}

function ExpiredView() {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("expired_title")}</h2>
      <p>{t("expired_text")}</p>
    </section>
  );
}

function NoBirthdayView() {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("no_birthday_title")}</h2>
      <p>{t("no_birthday_text")}</p>
    </section>
  );
}

function BirthdayView({
  person,
  isBlownOut,
  isListening,
  startListening,
  error,
}: {
  person: any;
  isBlownOut: boolean;
  isListening: boolean;
  startListening: () => void;
  error: string | null;
}) {
  const { t } = useTranslation();

  return (
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
          {error && <p className="mic-error">{t(`mic_error_${error}`)}</p>}
        </>
      )}
    </section>
  );
}

function HomePage() {
  const { i18n } = useTranslation();
  const [isBlownOut, setIsBlownOut] = useState(false);

  const cardData = readCardFromUrl();
  const isCustomCard = Boolean(cardData);
  const cardExpired = cardData ? isCardExpired(cardData) : false;

  useEffect(() => {
    if (cardData?.lang) {
      i18n.changeLanguage(cardData.lang);
    }
  }, [cardData?.lang, i18n]);

  const { isListening, startListening, error } = useMicrophoneSnuffer(() => {
    setIsBlownOut(true);
  });

  const person = !cardExpired ? cardData || getTodaysPerson() : null;

  const gradientId = getGradientId(person);
  const isLightText = gradientId ? TEXT_COLORS[gradientId] === "light" : false;

  const themeStyle = person
    ? ({ "--bg-color": person.gradient } as React.CSSProperties)
    : undefined;

  const containerClassName = `container${isLightText ? " light-text" : ""}`;

  return (
    <div className={containerClassName} style={themeStyle}>
      <Header showLanguages={!isCustomCard} />

      <div className="page-content">
        {cardData && cardExpired && <ExpiredView />}

        {!cardExpired && !person && <NoBirthdayView />}

        {!cardExpired && person && (
          <>
            <BirthdayView
              person={person}
              isBlownOut={isBlownOut}
              isListening={isListening}
              startListening={startListening}
              error={error}
            />
            {!isBlownOut && (
              <div className="canvas-wrapper">
                <Canvas
                  dpr={[1, 2]}
                  camera={{ position: [0, 0, 6.5], fov: 35 }}
                >
                  <ambientLight intensity={1} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <Suspense fallback={null}>
                    <Model />
                  </Suspense>
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </div>
            )}
          </>
        )}
      </div>

      {isBlownOut && (
        <div className="petals-overlay">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 50 }}>
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
              <FallingPetals />
            </Suspense>
          </Canvas>
        </div>
      )}

      <Footer style={themeStyle} />
    </div>
  );
}

function CreatePage() {
  return (
    <div className="container">
      <Header showLanguages />
      <div className="page-content">
        <CreateCard />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
}

export default App;
