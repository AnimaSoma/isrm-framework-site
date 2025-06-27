
import React from "react";
import ISRMGuardianSim from "./components/ISRMGuardianSim";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-3">ISRM Framework</h1>
        <p className="text-xl text-cyan-300">A Coherence-Driven Theory of Adaptation</p>
      </header>

      <section className="text-center max-w-2xl mx-auto space-y-4 text-lg leading-relaxed mb-16">
        <p>
          Welcome to the Interactionist Self-Regulation Model. This framework proposes that all adaptive
          systems—from particles to people—update their internal states based on coherence, prediction error,
          and energetic cost, quantified by a scalar function U(t).
        </p>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4">🧮 Interactive Equation</h2>
        <p className="text-gray-400 mb-2">[U(t) Equation Component Placeholder]</p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">🤖 ISRM Ball Avoidance Simulation</h2>
        <ISRMGuardianSim />
      </section>
    </div>
  );
}
