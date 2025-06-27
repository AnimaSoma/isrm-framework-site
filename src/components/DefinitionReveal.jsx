
import React, { useState } from "react";

const definitions = [
  {
    label: "👩‍🔬 From a Scientist",
    title: "A model for how systems adapt under constraint by balancing coherence and cost.",
    example: "🧪 Real-life example: Antibiotic persistence in bacteria. ISRM explains this as non-genetic state switching driven by internal coherence under stress, where only some cells update and enter dormancy."
  },
  {
    label: "🧠 From a Neuroscientist",
    title: "A principle for energy-efficient updates in the brain's predictive and conscious systems.",
    example: "🧠 Real-life example: Astrocyte-neuron metabolic coupling. ISRM explains how astrocytes gate neuronal updating by regulating energetic access based on coherence, preventing excessive firing when predictive utility is low."
  },
  {
    label: "⚛️ From a Physicist",
    title: "A coherence-based threshold for when quantum or physical systems change states.",
    example: "🧲 Real-life example: The Quantum Zeno Effect. ISRM interprets continuous observation as sustained salience input, preventing state transition by reinforcing coherence."
  },
  {
    label: "🤖 From an AI Researcher",
    title: "A biologically grounded utility function that governs self-regulating agents.",
    example: "🤖 Real-life example: Catastrophic forgetting in neural nets. ISRM suggests poor U(t) management—updating without coherence constraints—causes learned models to overwrite past patterns."
  },
  {
    label: "🌌 From a Cosmologist",
    title: "A framework for understanding time and entropy as outcomes of update costs.",
    example: "🌌 Real-life example: The arrow of time. ISRM explains time as emerging from selective state updates under constraint, making forward motion a product of coherence-driven evolution."
  },
  {
    label: "📉 From an Economist",
    title: "A model for rational adaptation under cost-benefit constraints, usable across markets and decision systems.",
    example: "💸 Real-life example: Market inertia despite clear signals. ISRM shows that if coherence gain is low or energy cost is high, updates are delayed even in the face of high salience—U(t) stays below threshold."
  }
];

export default function DefinitionReveal() {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4 font-sans">
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
            <div className="text-xl font-medium mb-1">{def.label}</div>
            <div className="text-sm text-cyan-200">{def.title}</div>
            {active === idx && (
              <div className="mt-3 text-xs text-cyan-100 transition-opacity duration-300 ease-in-out">
                {def.example}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 text-slate-100 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
        <p className="mb-4">
          The Interactionist Self-Regulation Model (ISRM) proposes that all adaptive systems—
          whether cellular, cognitive, artificial, or cosmological—evolve by regulating when to update their internal state.
        </p>
        <p className="mb-4">
          This decision is governed by a scalar function <code>U(t)</code>, defined by the balance between predicted coherence gain (ΔC),
          energetic cost (E), and contextual salience (S). An update occurs only if <code>U(t) = ΔC(t) - E(t) + S(t)</code> exceeds threshold.
        </p>
        <p>
          ISRM reframes adaptation as a coherence-driven, energy-constrained process that scales from the atom to the cosmos, offering a unifying logic
          behind learning, consciousness, cellular state switching, quantum behavior, and the emergence of time itself.
        </p>
      </div>
    </div>
  );
}
