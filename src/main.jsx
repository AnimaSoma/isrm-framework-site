import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Docs from "./pages/Docs";
import Papers from "./pages/Papers";
import Simulations from "./pages/Simulations";

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
