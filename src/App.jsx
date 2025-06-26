
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Interactionist Self-Regulation Model (ISRM)</h1>
        <p className="text-lg">A coherence-driven theory of adaptation from atoms to AI</p>
      </header>
      <nav className="mb-6 space-x-4">
        <Link className="text-blue-600 hover:underline" to="/docs">Docs</Link>
        <Link className="text-blue-600 hover:underline" to="/simulations">Simulations</Link>
        <Link className="text-blue-600 hover:underline" to="/papers">Papers</Link>
        <Link className="text-blue-600 hover:underline" to="/about">About</Link>
      </nav>
      <main className="space-y-4">
        <p>
          ISRM models adaptive systems as coherence-seeking entities that regulate state updates based on a scalar function U(t).
          This principle bridges phenomena across domains—from quantum state transitions to neural adaptation and artificial intelligence.
        </p>
        <p>
          Start by exploring the <Link to="/docs" className="text-blue-500 underline">documentation</Link> or check out live <Link to="/simulations" className="text-blue-500 underline">simulations</Link>.
        </p>
      </main>
    </div>
  );
}

function Docs() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4">ISRM Documentation</h2>
      <p className="mb-4">
        The Interactionist Self-Regulation Model (ISRM) introduces the update function <code>U(t)</code>,
        a scalar value representing the cost-benefit balance of coherence-driven state updates in an adaptive system.
      </p>
      <p className="mb-4">
        The system evaluates whether to transition states by balancing predicted error, energetic constraint, and salience:
      </p>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {`U(t) = ΔC(t) - E(t) + S(t)

Where:
- ΔC(t): Change in coherence (Δ prediction error)
- E(t): Energy cost of update
- S(t): Salience weighting from the Observer System`}
      </pre>
      <p className="mt-4">
        Systems only transition when U(t) > threshold, allowing dynamic filtering of irrelevant noise and metabolic cost control.
      </p>
    </div>
  );
}

function Simulations() {
  return (
    <div className="p-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">ISRM Simulations</h2>
      <p className="mb-2">This section will feature interactive demos of:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Energy-thresholded decision agents</li>
        <li>Coherence decay curves</li>
        <li>Simulated fluid dynamics under ISRM logic</li>
      </ul>
      <p className="mt-4 text-sm text-gray-600">Live simulations coming soon.</p>
    </div>
  );
}

function Papers() {
  return (
    <div className="p-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Research Papers</h2>
      <p className="mb-4">
        <a href="https://isrm-framework.org/handbook.pdf" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
          Download the ISRM Handbook (PDF)
        </a>
      </p>
      <h3 className="text-xl font-semibold mb-2">Citation (APA):</h3>
      <p>
        Schell, J. P. (2025). <i>The Interactionist Self-Regulation Model (ISRM): A Unifying Framework of Adaptation Across Scale</i>.
        Preprint. https://isrm-framework.org
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="p-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">About ISRM</h2>
      <p className="mb-4">
        Developed by Dr. John Paul Schell, ISRM bridges physics, biology, and artificial intelligence by modeling adaptation as coherence-driven,
        energy-constrained update behavior.
      </p>
      <p className="mb-4">
        The project integrates active inference, predictive processing, and thermodynamic cost theory to explain behavior from atoms to agents.
      </p>
      <p className="text-sm text-gray-600">
        Visit the GitHub repo:{" "}
        <a className="text-blue-500 underline" href="https://github.com/AnimaSoma/isrm-framework-site" target="_blank" rel="noopener noreferrer">
          AnimaSoma/isrm-framework-site
        </a>
      </p>
    </div>
  );
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
