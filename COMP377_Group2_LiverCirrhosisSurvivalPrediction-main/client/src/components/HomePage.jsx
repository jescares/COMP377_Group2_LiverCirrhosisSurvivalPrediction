import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Liver Cirrhosis Prediction App</h1>
      <p>This application helps predict patient outcomes based on various factors.</p>
      <Link to="/form">Start Prediction</Link>
    </div>
  );
}

export default HomePage;
