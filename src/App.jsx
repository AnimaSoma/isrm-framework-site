
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Interactionist Self-Regulation Model (ISRM)</h1>
        <p className="text-lg">A coherence-driven framework of adaptation from atoms to AI</p>
      </header>
      <nav className="mb-6 space-x-4">
        <Link className="text-blue-600 hover:underline" to="/docs">Docs</Link>
        <Link className="text-blue-600 hover:underline" to="/simulations">Simulations</Link>
        <Link className="text-blue-600 hover:underline" to="/papers">Papers</Link>
        <Link className="text-blue-600 hover:underline" to="/about">About</Link>
      </nav>
      <main>
        <p className="text-md mb-4">
          ISRM introduces a scalar signal \( U(t) \) to model state updates in adaptive systems across
          scales—from quantum particles and cells to cognitive agents and social systems.
        </p>
        <p className="text-md mb-4">
          Explore our theoretical foundations, interactive simulations, and ongoing applications in
          AI, physics, and biology.
        </p>
      </main>
    </div>
  );
}

function Docs() {
  return <div className="p-8 text-lg">ISRM documentation and implementation guides coming soon.</div>;
}
function Simulations() {
  return <div className="p-8 text-lg">Live ISRM simulation demos and visualizations will appear here.</div>;
}
function Papers() {
  return <div className="p-8 text-lg">Access ISRM whitepapers, preprints, and citations here.</div>;
}
function About() {
  return <div className="p-8 text-lg">Learn more about the ISRM project, authorship, and vision.</div>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/simulations" element={<Simulations />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
