import React from "react";
import "./HomepageISRM.css";

const HomepageISRM = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden text-white bg-gray-950">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
      >
        <source src="My Movie 1.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Interactionist Self-Regulation Model (ISRM)</h1>
        <p className="text-lg text-white/80 mb-10">
          A unifying theory of adaptation across biological, artificial, and physical systems.
        </p>

        <div className="text-3xl font-mono inline-flex gap-3 items-center justify-center flex-wrap">
          <HoverTerm label="U(t)" description="Update signal: governs whether a system changes state at time t." />
          =
          <HoverTerm label="dC(t)" description="Coherence discrepancy: prediction error or mismatch between expected and observed state." />
          −
          <HoverTerm label="E(t)" description="Energetic cost: resources needed to update the system." />
          +
          <HoverTerm label="S(t)" description="Salience: contextual importance of the stimulus or input." />
        </div>
      </div>
    </section>
  );
};

const HoverTerm = ({ label, description }) => (
  <span className="relative group cursor-help">
    <span className="underline decoration-dotted">{label}</span>
    <div className="absolute w-64 p-3 bg-white text-black text-sm rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 top-full left-1/2 transform -translate-x-1/2 mt-2">
      {description}
    </div>
  </span>
);

export default HomepageISRM;
