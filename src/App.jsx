
import React, { useMemo, useState } from "react";

const languages = {
  hu: { label: "Magyar", next: "next", back: "vissza" },
  en: { label: "English", next: "next", back: "back" },
  de: { label: "Deutsch", next: "weiter", back: "zurück" },
};

const modules = [
  {
    id: "water",
    title: {
      hu: "Vízrendszerek",
      en: "Water Systems",
      de: "Wassersysteme",
    },
    steps: {
      hu: [
        "A vízrendszer vízforrásból, tisztításból, elosztásból és monitoringból áll.",
        "A szennyvízkezelés civilizációs infrastruktúra.",
        "A monitoring a rendszer érzékszerve."
      ],
      en: [
        "Water systems include sourcing, treatment, distribution, and monitoring.",
        "Wastewater treatment is civilization infrastructure.",
        "Monitoring acts as the sensory layer of the system."
      ],
      de: [
        "Wassersysteme bestehen aus Quelle, Reinigung, Verteilung und Monitoring.",
        "Abwasserbehandlung ist Zivilisationsinfrastruktur.",
        "Monitoring ist die sensorische Ebene des Systems."
      ]
    }
  },
  {
    id: "waste",
    title: {
      hu: "Hulladék és körforgás",
      en: "Waste & Circular Systems",
      de: "Abfall & Kreislauf",
    },
    steps: {
      hu: [
        "A hulladék rosszul koordinált anyagáramlás.",
        "A refurbish jelentése: felújítás és újrahasználat.",
        "A circular economy célja az anyagok rendszerben tartása."
      ],
      en: [
        "Waste is poorly coordinated material flow.",
        "Refurbish means preparing an object for reuse.",
        "Circular economy aims to keep materials inside the system."
      ],
      de: [
        "Abfall ist schlecht koordinierter Materialfluss.",
        "Refurbish bedeutet Wiederaufbereitung.",
        "Kreislaufwirtschaft hält Materialien im System."
      ]
    }
  },
  {
    id: "monitoring",
    title: {
      hu: "Monitoring és adatok",
      en: "Monitoring & Data",
      de: "Monitoring & Daten",
    },
    steps: {
      hu: [
        "A monitoring mérés + megfigyelés + értelmezés.",
        "Az adat önmagában nem elég, hitelesítés is kell.",
        "A késő reakció gyakran nagyobb probléma, mint az adat hiánya."
      ],
      en: [
        "Monitoring = measurement + observation + interpretation.",
        "Data alone is not enough; verification matters.",
        "Delayed response is often worse than lack of data."
      ],
      de: [
        "Monitoring bedeutet Messen + Beobachten + Interpretieren.",
        "Daten allein reichen nicht aus.",
        "Verspätete Reaktion ist oft das eigentliche Problem."
      ]
    }
  }
];

export default function App() {
  const [language, setLanguage] = useState("hu");
  const [moduleId, setModuleId] = useState("water");
  const [stepIndex, setStepIndex] = useState(0);

  const module = useMemo(
    () => modules.find((m) => m.id === moduleId),
    [moduleId]
  );

  const steps = module.steps[language];
  const current = steps[stepIndex];
  const lang = languages[language];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "24px",
      fontFamily: "Arial"
    }}>
      <h1>Environmental Systems Learning Platform</h1>

      <div style={{ marginBottom: "20px" }}>
        {Object.entries(languages).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setLanguage(key)}
            style={{
              marginRight: "10px",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {value.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setModuleId(m.id);
              setStepIndex(0);
            }}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: moduleId === m.id ? "#10b981" : "#1e293b",
              color: "white",
              cursor: "pointer"
            }}
          >
            {m.title[language]}
          </button>
        ))}
      </div>

      <div style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "24px",
        maxWidth: "900px"
      }}>
        <h2>{module.title[language]}</h2>
        <h3>STEP {stepIndex + 1}</h3>

        <p style={{ fontSize: "20px", lineHeight: "1.7" }}>
          {current}
        </p>

        <div style={{ marginTop: "24px" }}>
          <button
            onClick={() => setStepIndex(Math.max(stepIndex - 1, 0))}
            style={{ marginRight: "12px", padding: "10px" }}
          >
            {lang.back}
          </button>

          <button
            onClick={() => setStepIndex(Math.min(stepIndex + 1, steps.length - 1))}
            style={{ padding: "10px" }}
          >
            {lang.next}
          </button>
        </div>
      </div>
    </div>
  );
}
