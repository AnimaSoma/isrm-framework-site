
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-8">
      <h1 className="text-5xl font-extrabold tracking-tight">Interactionist Self-Regulation Model (ISRM)</h1>
      <p className="text-xl max-w-3xl text-slate-300">
        U(t) = ΔC(t) – E(t) + S(t): ISRM is a coherence-driven framework explaining adaptive behavior under energetic constraint.
      </p>
      <div className="space-x-4">
        <Link to="/docs" className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-500">Docs</Link>
        <Link to="/simulations" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Simulations</Link>
        <Link to="/papers" className="bg-green-600 px-4 py-2 rounded hover:bg-green-500">Papers</Link>
      </div>
    </div>
  );
}
