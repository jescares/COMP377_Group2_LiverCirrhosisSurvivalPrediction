import React from 'react';
import './style.css'; 

const ResultForm = ({ predictionResult }) => {
  if (!predictionResult) {
    return null; // Don't render anything if there is no prediction result
  }

  return (
    <div className="results-container">
      <h2>Prediction Results</h2>
      <p>The model predicts: {predictionResult}</p>
      {/* Here you can map through the prediction results if it's an array or an object */}
      {/* This is just a placeholder; you'll need to adapt it based on your actual prediction result structure */}
    </div>
  );
};

export default ResultForm;
