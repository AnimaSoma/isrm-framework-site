import React from "react";
import BallAvoidanceSim from "./BallAvoidanceSim";
import BallFeedingSim from "./BallFeedingSim";
import "./HomepageISRM.css";

const HoverTerm = ({ label, description }) => (
  <span className="relative group cursor-help">
    <span className="underline decoration-dotted text-pink-400 font-bold">{label}</span>
    <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max max-w-xs text-sm bg-black text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xl">
      {description}
    </span>
  </span>
);

const SimulationsSection = () => {
  return (
    <>
      <div className="relative w-full min-h-screen bg-black">
        <video autoPlay muted loop playsInline className="absolute top-20 left-0 w-full h-[80vh] object-cover opacity-20 z-0">
          <source src="/My Movie 1.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 py-32 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">Interactionist Self-Regulation Model (ISRM)</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Understanding adaptation across biological, artificial, and physical systems has long demanded a unifying principle capable of integrating prediction, coherence, and energetic limitation. Here, we introduce the Interactionist Self-Regulation Model (ISRM), a general framework grounded in the energetic cost of state updating under constraint. The model posits that all adaptive systems—whether molecular or cognitive, synthetic or cosmological—operate by modulating a scalar signal:
          </p>

          <div className="mt-10 text-pink-500 text-3xl font-semibold">
            U(t) = Σ(<HoverTerm label="Sᵢ" description="Salience of input i" /> × <HoverTerm label="PEᵢ" description="Prediction error for input i" /> × <HoverTerm label="Eₐᵥₐᵢₗ" description="Available energy for update" />)
          </div>

          <div className="mt-6 space-y-2 text-white/80 text-sm max-w-xl mx-auto">
            <p><strong>Sᵢ</strong>: The salience of an incoming signal or internal representation, weighted by context and memory.</p>
            <p><strong>PEᵢ</strong>: The prediction error, representing mismatch between expected and actual outcomes for each i.</p>
            <p><strong>Eₐᵥₐᵢₗ</strong>: The system’s available energetic budget for adaptation, modulating whether action is taken.</p>
            <p><strong>U(t)</strong>: The total update signal, determining whether and how the system adapts in the current timestep.</p>
          </div>
        </div>
      </div>

      <section className="py-28 bg-gray-950 text-white border-t border-white/10">
        <div className="container mx-auto px-4 max-w-5xl space-y-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">ISRM Simulations</h2>
            <p className="text-lg text-white/70">
              These interactive environments demonstrate how agent models behave under ISRM-based energetic and coherence constraints.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">ISRM Ball Avoidance Simulation</h3>
            <p className="text-white/60 mb-4">
              In this simulation, agents attempt to avoid high-speed obstacle balls. The ISRM agent strategically limits its movement to conserve energy, only reacting when prediction error and salience justify the cost. The Reflex agent responds immediately to threats regardless of energy depletion, while the Stoic agent remains mostly inert.
            </p>
            <BallAvoidanceSim />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">ISRM Ball Feeding Simulation</h3>
            <p className="text-white/60 mb-4">
              Here, agents seek out food to replenish energy while managing movement costs. The ISRM agent optimizes for energy efficiency and selective engagement. The Reflex agent chases any visible food immediately, burning energy quickly. The Machine Learning agent tracks recent cost-to-reward ratios and adapts strategy accordingly.
            </p>
            <BallFeedingSim />
          </div>
        </div>
      </section>
    </>
  );
};

export default SimulationsSection;
