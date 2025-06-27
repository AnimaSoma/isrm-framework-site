
import React, { useState } from "react";

const terms = [
  {
    symbol: "U(t)",
    description: "Update potential — the system's net incentive to change state.",
    formula: "U(t) = ΔC(t) - E(t) + S(t)"
  },
  {
    symbol: "ΔC(t)",
    description: "Change in coherence — how much more predictable or integrated the system becomes if it updates.",
    formula: "ΔC(t) = C_new(t) - C_current(t)"
  },
  {
    symbol: "E(t)",
    description: "Energy cost — how much metabolic, computational, or thermodynamic work is required for the update.",
    formula: "E(t) = ∫ [energy required to transition from state A → B]"
  },
  {
    symbol: "S(t)",
    description: "Salience — urgency or importance of the change, driven by observer input or environmental relevance.",
    formula: "S(t) = weight(observer relevance, context)"
  }
];

export default function EquationReveal() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="text-center text-slate-100 py-16 px-4 font-sans">
      <h2 className="text-3xl font-semibold mb-6">The ISRM Equation</h2>
      <div className="text-4xl md:text-5xl font-bold space-x-2 select-none">
        {["U(t)", "=", "ΔC(t)", "–", "E(t)", "+", "S(t)"].map((term, i) => (
          <span
            key={i}
            onMouseEnter={() => setHovered(term)}
            onMouseLeave={() => setHovered(null)}
            className={`transition-colors duration-200 ${
              hovered === term ? "text-cyan-300" : ""
            }`}
          >
            {term}
          </span>
        ))}
      </div>
      <div className="mt-8 h-28">
        {terms.map((t, idx) =>
          hovered === t.symbol ? (
            <div
              key={idx}
              className="text-cyan-200 text-base md:text-lg max-w-2xl mx-auto space-y-2"
            >
              <div><strong>{t.symbol}:</strong> {t.description}</div>
              <div className="text-sm italic text-cyan-300">{t.formula}</div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
