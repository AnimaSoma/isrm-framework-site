import React from "react";
import ISRMGuardianSim from "../components/ISRMGuardianSim";

export default function Simulations() {
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Ball Avoidance Simulation</h1>
      <ISRMGuardianSim />
    </div>
  );
}
