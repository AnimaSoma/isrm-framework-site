
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Docs from "./pages/Docs.jsx";
import Simulations from "./pages/Simulations.jsx";
import Papers from "./pages/Papers.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/simulations" element={<Simulations />} />
      <Route path="/papers" element={<Papers />} />
    </Routes>
  </Router>
);
