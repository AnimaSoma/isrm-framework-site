
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DefinitionReveal from './components/DefinitionReveal';
import EquationReveal from './components/EquationReveal';
import ISRMOrbitSimulation from './components/ISRMOrbitSimulation';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 px-6 py-12 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-serif font-bold mb-3 tracking-tight">Interactionist Self-Regulation Model (ISRM)</h1>
        <p className="text-xl text-cyan-300">A coherence-driven theory of adaptation from atoms to AI</p>
      </header>
      <nav className="flex justify-center gap-6 text-cyan-400 mb-10">
        <Link className="hover:text-white transition" to="/docs">Docs</Link>
        <Link className="hover:text-white transition" to="/simulations">Simulations</Link>
        <Link className="hover:text-white transition" to="/papers">Papers</Link>
        <Link className="hover:text-white transition" to="/about">About</Link>
      </nav>
      <main className="text-center max-w-2xl mx-auto space-y-4 text-lg leading-relaxed">
        <p>
          ISRM models adaptive systems as coherence-seeking entities that regulate their state updates based on a scalar function <code>U(t)</code>.
        </p>
        <p>
          This principle bridges phenomena across domains—from quantum transitions and cell behavior to conscious agents and cosmic expansion.
        </p>
        <p>
          Explore the <Link to="/docs" className="text-cyan-300 underline">framework documentation</Link>, view live <Link to="/simulations" className="text-cyan-300 underline">simulations</Link>, or read our <Link to="/papers" className="text-cyan-300 underline">research papers</Link>.
        </p>
      </main>
      <EquationReveal />
      <ISRMOrbitSimulation />
      <DefinitionReveal />
    </div>
  );
}

const Docs = () => <div className="p-10 text-slate-100">[Documentation coming soon]</div>;
const Simulations = () => <div className="p-10 text-slate-100">[Simulations will be interactive]</div>;
const Papers = () => <div className="p-10 text-slate-100">[Research papers and preprints]</div>;
const About = () => <div className="p-10 text-slate-100">[About the ISRM project]</div>;

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
