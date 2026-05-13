import React, { useMemo, useState } from "react";
import { ui, languages, modules } from "./data.js";

export default function App() {
  const [language, setLanguage] = useState("hu");
  const [moduleId, setModuleId] = useState("systems");
  const [stepIndex, setStepIndex] = useState(0);

  const labels = ui[language] || ui.hu;
  const module = useMemo(() => modules.find((m) => m.id === moduleId) || modules[0], [moduleId]);
  const steps = module.steps[language] || module.steps.hu;
  const step = steps[stepIndex] || steps[0];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  function switchLanguage(lang) {
    setLanguage(lang);
    setStepIndex(0);
  }

  function switchModule(id) {
    setModuleId(id);
    setStepIndex(0);
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="heroMain">
          <p className="eyebrow">Environmental Systems</p>
          <h1>{labels.hero}</h1>
          <p className="subtitle">{labels.subtitle}</p>
        </div>
        <div className="progressCard">
          <span>{labels.progress}</span>
          <strong>{progress}%</strong>
          <div className="bar"><div style={{ width: `${progress}%` }} /></div>
          <small>{labels.step} {stepIndex + 1} / {steps.length}</small>
        </div>
      </header>

      <section className="controls">
        <div className="panel">
          <h2>{labels.language}</h2>
          <div className="buttonGrid">
            {Object.entries(languages).map(([key, label]) => (
              <button key={key} className={language === key ? "active" : ""} onClick={() => switchLanguage(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>{labels.modules}</h2>
          <div className="moduleGrid">
            {modules.map((m) => (
              <button key={m.id} className={moduleId === m.id ? "active" : ""} onClick={() => switchModule(m.id)}>
                {m.titles[language] || m.titles.hu}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="lesson">
        <div className="lessonTop">
          <p className="eyebrow">{module.titles[language] || module.titles.hu}</p>
          <h2>{labels.step} {stepIndex + 1}: {step.title}</h2>
        </div>

        <div className="block">
          <h3>{labels.explanation}</h3>
          <p>{step.body}</p>
        </div>

        <div className="block example">
          <h3>{labels.example}</h3>
          <p>{step.example}</p>
        </div>

        <div className="block insight">
          <h3>{labels.insight}</h3>
          <p>{step.insight}</p>
        </div>

        <div className="nav">
          <button disabled={stepIndex === 0} onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}>
            {labels.back}
          </button>
          <button disabled={stepIndex === steps.length - 1} onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))}>
            {labels.next}
          </button>
        </div>
      </main>
    </div>
  );
}
