
import React, { useMemo, useState } from "react";
import { languages, modules } from "./data.js";

export default function App() {
  const [language, setLanguage] = useState("hu");
  const [moduleId, setModuleId] = useState("systems");
  const [stepIndex, setStepIndex] = useState(0);
  const module = useMemo(() => modules.find((m) => m.id === moduleId), [moduleId]);
  const steps = module.steps[language] || module.steps.hu;
  const step = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Environmental Systems Learning Platform</p>
          <h1>Multilingual step-by-step systems learning</h1>
          <p className="subtitle">Környezetvédelem, infrastruktúra, monitoring, circular systems, governance és ipari kockázatok — kis, “next”-alapú lépésekben.</p>
        </div>
        <div className="progressCard">
          <span>Progress</span><strong>{progress}%</strong>
          <div className="bar"><div style={{ width: `${progress}%` }} /></div>
          <small>STEP {stepIndex + 1} / {steps.length}</small>
        </div>
      </header>
      <section className="controls">
        <div><h2>Language</h2><div className="buttonGrid">{Object.entries(languages).map(([key,label])=><button key={key} className={language===key?"active":""} onClick={()=>setLanguage(key)}>{label}</button>)}</div></div>
        <div><h2>Modules</h2><div className="moduleGrid">{modules.map((m)=><button key={m.id} className={moduleId===m.id?"active":""} onClick={()=>{setModuleId(m.id);setStepIndex(0)}}>{m.titles[language] || m.titles.hu}</button>)}</div></div>
      </section>
      <main className="lesson">
        <div className="lessonTop"><p className="eyebrow">{module.titles[language] || module.titles.hu}</p><h2>STEP {stepIndex + 1}: {step.title}</h2></div>
        <div className="block"><h3>Explanation</h3><p>{step.body}</p></div>
        <div className="block example"><h3>Example / country context</h3><p>{step.example}</p></div>
        <div className="block insight"><h3>Systems insight</h3><p>{step.insight}</p></div>
        <div className="nav"><button disabled={stepIndex===0} onClick={()=>setStepIndex(Math.max(0,stepIndex-1))}>back</button><button disabled={stepIndex===steps.length-1} onClick={()=>setStepIndex(Math.min(steps.length-1,stepIndex+1))}>next</button></div>
      </main>
    </div>
  );
}
