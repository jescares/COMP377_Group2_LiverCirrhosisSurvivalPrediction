import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';  // Import the AuthProvider
import RequireAuth from './components/RequireAuth';  // Import the RequireAuth component for route guarding

import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PredictionForm from './components/PredictionForm';
import ResultForm from './components/ResultForm';

const App = () => {
  return (
    <AuthProvider>  {/* Wrap the entire Router with AuthProvider to enable context throughout */}
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/prediction-form" element={
            <RequireAuth> {/* Protect this route to ensure only authenticated users can access */}
              <PredictionForm />
            </RequireAuth>
          } />
          
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/result-form" element={<ResultForm />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
