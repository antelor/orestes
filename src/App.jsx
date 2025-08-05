// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Poll from "./Poll";
import Justicia from "./Justicia";
import Venganza from "./Venganza";
import Admin from "./Admin";
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Poll />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/justicia" element={<Justicia />} />
        <Route path="/venganza" element={<Venganza />} />
      </Routes>
    </Router>
  );
}

export default App;
