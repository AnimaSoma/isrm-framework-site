
import React, { useState } from "react";

const perspectives = {
  Scientist:
    "ISRM describes how biological systems, like cells and organisms, regulate their states through coherence and energetic cost, offering a new view on adaptation.",
  Physicist:
    "ISRM reframes entropy, coherence, and quantum collapse as energy-constrained updates by observer systems within a physical system.",
  Neuroscientist:
    "ISRM explains astrocyte-neuron metabolic coupling as an energetic gatekeeping system for conscious state updates.",
  AI: "ISRM provides a framework for synthetic consciousness by modeling decision-making as coherence-driven, energy-limited internal updating.",
  Economist:
    "ISRM predicts agent behavior in markets as updates in belief and action constrained by available energy (capital, attention, resources)."
};

export default function WhatIsISRM() {
  const [hovered, setHovered] = useState("");

  return (
    <div className="text-white py-12 text-center max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">What is ISRM?</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(perspectives).map((key) => (
          <button
            key={key}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered("")}
            className="bg-cyan-900 hover:bg-cyan-600 transition px-6 py-2 rounded-full text-white font-medium shadow"
          >
            From a {key}
          </button>
        ))}
      </div>
      {hovered && (
        <p className="text-gray-300 max-w-3xl mx-auto mt-4 text-lg italic transition duration-300">
          {perspectives[hovered]}
        </p>
      )}
    </div>
  );
}
