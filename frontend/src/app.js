import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadResume from './components/UploadResume';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Smart Resume Analyzer</h1>
        <Routes>
          <Route path="/" element={<UploadResume />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;