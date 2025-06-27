
import React from "react";
import ISRMImmortalLearner from "../components/ISRMImmortalLearner";

export default function Simulations() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto font-sans text-slate-100">
      <h2 className="text-3xl font-bold text-center mb-6">ISRM Simulations</h2>
      <p className="text-center text-slate-300 mb-10">
        Explore interactive simulations demonstrating the Interactionist Self-Regulation Model in action.
      </p>

      <section className="mb-16">
        <ISRMImmortalLearner />
      </section>

      <section className="text-center text-slate-400 text-sm">
        More simulations coming soon: U(t) chart agents, swarm logic, nested coherence...
      </section>
    </div>
  );
}
