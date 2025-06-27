import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Docs from "./pages/Docs.jsx";
import Papers from "./pages/Papers.jsx";
import Simulations from "./pages/Simulations.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/simulations" element={<Simulations />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
