import React from 'react';
import { useLocation } from 'react-router-dom';

function PredictionPage() {
  const location = useLocation();
  const { predictionData } = location.state || { predictionData: 'No data available' };

  return (
    <div>
      <h1>Prediction Result</h1>
      <p>{predictionData}</p>
    </div>
  );
}

export default PredictionPage;
