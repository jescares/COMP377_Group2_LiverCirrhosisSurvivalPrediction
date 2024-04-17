import React from 'react';
import './style.css';

const ResultForm = ({ formData, predictionResult }) => {
  if (!predictionResult) {
    return null; // Don't render anything if there is no prediction result
  }

  // Extract and display user inputs along with the prediction result
  const userInputElements = Object.entries(formData).map(([key, value]) => (
    <p key={key}><strong>{key}:</strong> {value}</p>
  ));

  return (
    <div className="results-container">
      <h2>Prediction Results</h2>
      <div className="user-inputs">
        {userInputElements}
      </div>
      <div className="prediction-output">
        <p><strong>Model Prediction:</strong> {predictionResult}</p>
      </div>
    </div>
  );
};

export default ResultForm;
