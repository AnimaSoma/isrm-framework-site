
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ISRM Framework</Link>
        <div className="space-x-4">
          <Link to="/framework" className="hover:underline">Framework</Link>
          <Link to="/simulations" className="hover:underline">Simulations</Link>
          <Link to="/publications" className="hover:underline">Publications</Link>
          <Link to="/applications" className="hover:underline">Applications</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">The Interactionist Self-Regulation Model (ISRM)</h1>
        <p className="text-xl mb-8">
          A unifying framework for understanding adaptation across scales—from atomic coherence to artificial intelligence.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-3">What is ISRM?</h2>
              <p>
                ISRM posits that all adaptive systems operate through the dynamic regulation of internal states based on energy-constrained prediction. It introduces the scalar function U(t) to quantify the cost-benefit tradeoff of state updates in Physical (PS) and Observer (OS) Systems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-3">Start Exploring</h2>
              <p className="mb-4">Dive deeper into the ISRM framework, real-time simulations, and cross-domain applications.</p>
              <div className="space-x-2">
                <Link to="/framework"><Button>View Framework</Button></Link>
                <Link to="/simulations"><Button variant="outline">Simulations</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Framework() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">ISRM Framework</h2>
      <p>
        The framework introduces the Physical System (PS) and Observer System (OS), connected via an energy-constrained prediction update function U(t). Coherence collapse, predictive salience, and the emergence of time are all explained through this model.
      </p>
    </div>
  );
}

function Simulations() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Simulations</h2>
      <p>Explore interactive models and visualizations of ISRM agents, coherence collapse, and adaptive behavior across domains.</p>
    </div>
  );
}

function Publications() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Publications & Preprints</h2>
      <ul className="list-disc list-inside">
        <li><a className="text-blue-600" href="#">ISRM Handbook (PDF)</a></li>
        <li><a className="text-blue-600" href="#">Time Emergence via OS Updates</a></li>
        <li><a className="text-blue-600" href="#">Predictive Agents Under Constraint</a></li>
      </ul>
    </div>
  );
}

function Applications() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Applications</h2>
      <ul className="list-disc list-inside">
        <li>Cellular Adaptation and iPSC Reprogramming</li>
        <li>Agent-Based AI Decision Systems</li>
        <li>Cosmic Expansion and Entropy Modeling</li>
        <li>Trauma Processing and Predictive Overload</li>
        <li>Nuclear Reactor Safety Algorithms</li>
      </ul>
    </div>
  );
}

function Contact() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <p>Email: johnpaulschell@gmail.com</p>
      <p>GitHub: <a className="text-blue-600" href="https://github.com/AnimaSoma">AnimaSoma</a></p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/framework" element={<Framework />} />
        <Route path="/simulations" element={<Simulations />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
