import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Docs from "./pages/Docs";
import Papers from "./pages/Papers";
import Simulations from "./pages/Simulations";
import About from "./pages/About";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/papers" element={<Papers />} />
      <Route path="/simulations" element={<Simulations />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
