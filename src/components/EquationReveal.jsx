
import React, { useState } from "react";

const termInfo = {
  "U(t)": "Scalar utility function over time, representing overall system pressure to update.",
  "∂C": "Change in coherence — how well internal and external states align.",
  "∂E": "Change in energy availability — metabolic or computational resources.",
  "∂P": "Change in prediction error — mismatch between expected and observed input."
};

export default function EquationReveal() {
  const [hovered, setHovered] = useState("");

  return (
    <div className="text-white bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto text-center mb-10">
      <h2 className="text-3xl font-semibold mb-4">🔬 The ISRM Equation</h2>
      <p className="text-lg font-mono text-cyan-400">
        <span
          className="hover:underline cursor-pointer"
          onMouseEnter={() => setHovered("U(t)")}
          onMouseLeave={() => setHovered("")}
        >
          U(t)
        </span>{" "}
        = w₁
        <span
          className="hover:underline cursor-pointer"
          onMouseEnter={() => setHovered("∂C")}
          onMouseLeave={() => setHovered("")}
        >
          ∂C
        </span>{" "}
        - w₂
        <span
          className="hover:underline cursor-pointer"
          onMouseEnter={() => setHovered("∂E")}
          onMouseLeave={() => setHovered("")}
        >
          ∂E
        </span>{" "}
        + w₃
        <span
          className="hover:underline cursor-pointer"
          onMouseEnter={() => setHovered("∂P")}
          onMouseLeave={() => setHovered("")}
        >
          ∂P
        </span>
      </p>
      {hovered && (
        <p className="mt-4 text-sm text-gray-300 max-w-xl mx-auto italic transition-opacity duration-300">
          {termInfo[hovered]}
        </p>
      )}
    </div>
  );
}
