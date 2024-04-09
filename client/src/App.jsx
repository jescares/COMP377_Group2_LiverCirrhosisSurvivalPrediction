import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import LoginPage from './components/LoginPage';
import PredictionForm from './components/PredictionForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/prediction-form" element={<PredictionForm />} />
        <Route path="/login-page" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
