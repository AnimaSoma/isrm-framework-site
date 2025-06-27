
import React from "react";
import ISRMGuardianSim from "../components/ISRMGuardianSim";

export default function Simulations() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-sans">
      <h1 className="text-4xl font-bold text-center mb-6">ISRM Simulations</h1>
      <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto mb-8">
        Below is a demonstration of how only an ISRM-aligned agent — the white "Immortal Ball" — can adapt to
        ever-shifting environmental pressures, while others fade into incoherence. Competing agents follow basic
        rules (wander, attract, repel) and cannot maintain coherence as conditions evolve.
      </p>
      <ISRMGuardianSim />
    </div>
  );
}
