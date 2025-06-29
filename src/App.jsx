import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DefinitionReveal from './components/DefinitionReveal';
import EquationReveal from './components/EquationReveal';
import ISRMOrbitSimulation from './components/ISRMOrbitSimulation';
import SimulationsSection from "./components/sections/SimulationsSection";
import Homepage from "./components/sections/Homepage";

const Docs = () => <div className="p-10 text-slate-100">[Documentation coming soon]</div>;
const Simulations = () => <SimulationsSection />;
const Papers = () => <div className="p-10 text-slate-100">[Research papers and preprints]</div>;
const About = () => <div className="p-10 text-slate-100">[About the ISRM project]</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/simulations" element={<Simulations />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
