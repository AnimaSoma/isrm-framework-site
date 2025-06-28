import React from "react";

export default function Landing() {
  return (
    <div className="p-10 max-w-4xl mx-auto text-slate-100">
      <h1 className="text-4xl font-bold mb-4">Interactionist Self-Regulation Model (ISRM)</h1>
      <p className="mb-6 text-slate-300">A coherence-driven theory of adaptation from atoms to AI</p>
      <p className="mb-4">ISRM models adaptive systems as coherence-seeking entities that regulate their state updates based on a scalar function U(t).</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">The ISRM Equation</h2>
      <div className="text-lg font-mono bg-slate-800 p-4 rounded">U(t) = ΔC(t) - E(t) + S(t)</div>
      <h2 className="text-xl font-semibold mt-8 mb-2">What is ISRM?</h2>
      <p>The Interactionist Self-Regulation Model (ISRM) proposes that all adaptive systems—whether cellular, cognitive, artificial, or cosmological—evolve by regulating when to update their internal state.</p>
    </div>
  );
}
