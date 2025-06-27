
import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold mb-4">ISRM Framework</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-xl">
        Welcome to the Interactionist Self-Regulation Model. This site explores how coherence, prediction error,
        and energetic cost drive adaptive behavior across all scales — from atoms to AI.
      </p>
      <div className="flex gap-6">
        <a href="/docs" className="text-cyan-400 hover:underline">Docs</a>
        <a href="/simulations" className="text-cyan-400 hover:underline">Simulations</a>
        <a href="/papers" className="text-cyan-400 hover:underline">Papers</a>
        <a href="/about" className="text-cyan-400 hover:underline">About</a>
      </div>
    </div>
  );
}
