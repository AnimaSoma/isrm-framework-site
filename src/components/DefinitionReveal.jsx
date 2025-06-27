
import React, { useState } from "react";

const definitions = [
  {
    label: "👩‍🔬 From a Scientist",
    text: "A model for how systems adapt under constraint by balancing coherence and cost."
  },
  {
    label: "🧠 From a Neuroscientist",
    text: "A principle for energy-efficient updates in the brain's predictive and conscious systems."
  },
  {
    label: "⚛️ From a Physicist",
    text: "A coherence-based threshold for when quantum or physical systems change states."
  },
  {
    label: "🤖 From an AI Researcher",
    text: "A biologically grounded utility function that governs self-regulating agents."
  },
  {
    label: "🌌 From a Cosmologist",
    text: "A framework for understanding time and entropy as outcomes of update costs."
  }
];

export default function DefinitionReveal() {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-semibold text-center text-slate-100 mb-6">
        What is ISRM?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {definitions.map((def, idx) => (
          <div
            key={idx}
            className="p-6 rounded-lg bg-slate-800 text-slate-100 shadow-md transition duration-300 hover:bg-cyan-700 cursor-pointer relative"
            onMouseEnter={() => setActive(idx)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="text-xl font-medium">{def.label}</div>
            {active === idx && (
              <div className="mt-3 text-sm text-cyan-100 transition-opacity duration-300 ease-in-out">
                {def.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
