import React, { useState } from 'react';
import './style.css'; 
import axios from 'axios';
import ResultForm from './ResultForm';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    drug: '',
    ageYears: '',
    sex: '',
    ascites: '',
    hepatomegaly: '',
    spiders: '',
    edema: '',
    bilirubin: '',
    cholesterol: '',
    albumin: '',
    copper: '',
    alk_phos: '',
    sgot: '',
    triglycerides: '',
    platelets: '',
    prothrombin: '',
    stage: '',
  });

  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        const prediction = response.data.prediction[0]; // Access the first element of the array
        console.log('Prediction:', prediction);
        if (prediction === 0) {
          setPredictionResult('Based on the data above, the patient is likely to survive.');
        } else {
          setPredictionResult('Based on the data above, the patient is at risk of death.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setPredictionResult('An error occurred while processing the prediction.');
      });
  };
  

  
  // Function to convert age from years to days
  const convertAgeToDays = (ageYears) => {
    return ageYears * 365; // Assume average year has 365 days
  };

  return (
    <div className="container">
      <h1>Liver Cirrhosis Survival Predictor</h1>
      <h4>Please fill out the form below</h4>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Drug:</label>
          <select
            name="drug"
            value={formData.drug}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="D-penicillamine">D-penicillamine</option>
            <option value="Placebo">Placebo</option>
          </select>
        </div>
        <div>
          <label>Age (in years):</label>
          <input
            type="number"
            name="ageYears"
            value={formData.ageYears}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sex:</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div>
          <label>Ascites:</label>
          <select
            name="ascites"
            value={formData.ascites}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
        <div>
          <label>Hepatomegaly:</label>
          <select
            name="hepatomegaly"
            value={formData.hepatomegaly}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
        <div>
          <label>Spiders:</label>
          <select
            name="spiders"
            value={formData.spiders}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
        <div>
          <label>Edema:</label>
          <select
            name="edema"
            value={formData.edema}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="N">No</option>
            <option value="S">Slight</option>
            <option value="Y">Yes</option>
          </select>
        </div>
        <div>
          <label>Bilirubin (mg/dl):</label>
          <input
            type="text"
            name="bilirubin"
            value={formData.bilirubin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cholesterol (mg/dl):</label>
          <input
            type="text"
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Albumin (mg/dl):</label>
          <input
            type="text"
            name="albumin"
            value={formData.albumin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Copper (ug/day):</label>
          <input
            type="text"
            name="copper"
            value={formData.copper}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Alk Phos (U/liter):</label>
          <input
            type="text"
            name="alk_phos"
            value={formData.alk_phos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>SGOT (U/ml):</label>
          <input
            type="text"
            name="sgot"
            value={formData.sgot}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Triglycerides (mg/dl):</label>
          <input
            type="text"
            name="triglycerides"
            value={formData.triglycerides}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Platelets (ml/1000):</label>
          <input
            type="text"
            name="platelets"
            value={formData.platelets}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Prothrombin (s):</label>
          <input
            type="text"
            name="prothrombin"
            value={formData.prothrombin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stage:</label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      
      {/* Display prediction result */}
      {predictionResult && (
        <div className="prediction-result">
          <h2>Prediction Result:</h2>
          <p>{predictionResult}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
