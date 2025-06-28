import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Docs from "./pages/Docs";
import Simulations from "./pages/Simulations";
import Papers from "./pages/Papers";
import About from "./pages/About";

const App = () => (
  <Router>
    <div className="bg-black text-white min-h-screen">
      <nav className="p-4 bg-slate-900 flex justify-between text-sm">
        <span className="font-bold">ISRM</span>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/docs">Docs</Link>
          <Link to="/simulations">Simulations</Link>
          <Link to="/papers">Papers</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/simulations" element={<Simulations />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
