import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { TerminalPage } from './pages/TerminalPage';
import { Learning } from './pages/Learning';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terminal" element={<TerminalPage />} />
        <Route path="/learn" element={<Learning />} />
        {/* Fallback routes for specific categories */}
        <Route path="/c" element={<Learning />} />
        <Route path="/git" element={<Learning />} />
      </Routes>
    </Router>
  );
}
