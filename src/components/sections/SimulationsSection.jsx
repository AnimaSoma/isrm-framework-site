import React from "react";
import BallAvoidanceSim from "./BallAvoidanceSim";
import BallFeedingSim from "./BallFeedingSim";

const SimulationsSection = () => {
  return (
    <section className="py-20 bg-gray-950 text-white border-t border-white/10">
      <div className="container mx-auto px-4 max-w-5xl space-y-20">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">ISRM Simulations</h2>
          <p className="text-lg text-white/70">
            These interactive environments demonstrate how different agent models behave under energetic and coherence constraints.
          </p>
        </div>

        {/* Survival / Avoidance Simulation */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">⚠️ ISRM Ball Avoidance Simulation</h3>
          <p className="text-white/60 mb-4">
            Agents must avoid high-speed hazards. The ISRM agent uses coherence-aware updating; Reflex reacts instantly; Stoic remains inert. Energy depletes with movement and restores over time. Hits reduce energy by half.
          </p>
          <BallAvoidanceSim />
        </div>

        {/* Feeding Simulation */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">🍽️ ISRM Ball Feeding Simulation</h3>
          <p className="text-white/60 mb-4">
            Here, agents seek out contact with balls to replenish energy. Each contact adds to their survival score, while movement drains energy. Efficient behavior is essential to stay alive and thrive.
          </p>
          <BallFeedingSim />
        </div>
      </div>
    </section>
  );
};

export default SimulationsSection;

