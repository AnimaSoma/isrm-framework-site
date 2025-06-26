
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Interactionist Self-Regulation Model Launchpad</Link>
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/framework" element={<div>Framework</div>} />
        <Route path="/simulations" element={<div>Simulations</div>} />
        <Route path="/publications" element={<div>Publications</div>} />
        <Route path="/applications" element={<div>Applications</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </Router>
  );
}

export default App;
