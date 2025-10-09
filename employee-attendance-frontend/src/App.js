import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import AttendancePage from './pages/AttendancePage';
import HomePage from './pages/HomePage';
import ExportPage from './pages/ExportPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/attendances" element={<AttendancePage />} />
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
