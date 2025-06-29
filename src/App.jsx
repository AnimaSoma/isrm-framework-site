import React from "react";
import SimulationsSection from "./components/sections/SimulationsSection";

const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="text-center py-10 border-b border-white/10">
        <h1 className="text-3xl font-bold">ISRM Framework</h1>
        <p className="text-white/70 mt-2">Exploring coherence-driven adaptive systems</p>
      </header>

      <main className="py-10">
        <div className="bg-green-800 text-white text-center p-4 mb-6 rounded">
          ✅ App.jsx loaded & SimulationsSection imported
        </div>
        <SimulationsSection />
      </main>
    </div>
  );
};

export default App;
