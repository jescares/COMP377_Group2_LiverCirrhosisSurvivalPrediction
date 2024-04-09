import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [formData, setFormData] = useState({
    status: '',
    drug: '',
    age: '', // This will initially be in years for user input, converted upon submission
    sex: '',
    ascites: '',
    hepatomegaly: '',
    spiders: '',
    edema: '',
    bilirubin: '',
    cholesterol: '',
    albumin: '',
    copper: '',
    alkPhos: '',
    sgot: '',
    triglycerides: '',
    platelets: '',
    prothrombin: '',
    stage: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert age from years to days for the submission
    const submissionData = {
      ...formData,
      age: formData.age * 365, // Convert age to days
    };

    fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData), // Use the transformed submissionData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/prediction', { state: { predictionData: data } });
    })
    .catch(error => {
      console.error('Error during prediction:', error);
    });

    //console.log(submissionData); // Example submission logic
    // Assuming you would call your backend API here and then:
    // history.push('/someRouteAfterSubmission', { someState: 'Some state to pass' });

    // Reset form or provide feedback as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="">Select</option>
          <option value="C">Survived</option>
          <option value="CL">Survived due to treatment</option>
          <option value="D">Death</option>
        </select>
      </div>

      <div>
        <label>Drug:</label>
        <select name="drug" value={formData.drug} onChange={handleChange}>
          <option value="">Select</option>
          <option value="D-penicillamine">D-penicillamine</option>
          <option value="Placebo">Placebo</option>
        </select>
      </div>

      <div>
        <label>Age (in years):</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </div>

      <div>
        <label>Sex:</label>
        <select name="sex" value={formData.sex} onChange={handleChange}>
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <div>
        <label>Ascites:</label>
        <select name="ascites" value={formData.ascites} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>

      <div>
        <label>Hepatomegaly:</label>
        <select name="hepatomegaly" value={formData.hepatomegaly} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>

      <div>
        <label>Spiders:</label>
        <select name="spiders" value={formData.spiders} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>

      <div>
        <label>Edema:</label>
        <select name="edema" value={formData.edema} onChange={handleChange}>
          <option value="">Select</option>
          <option value="N">No</option>
          <option value="S">Slight</option>
          <option value="Y">Yes</option>
        </select>
      </div>

      <div>
        <label>Bilirubin (mg/dL):</label>
        <input type="number" name="bilirubin" value={formData.bilirubin} onChange={handleChange} />
      </div>

      <div>
        <label>Cholesterol (mg/dL):</label>
        <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} />
      </div>

      <div>
        <label>Albumin (g/dL):</label>
        <input type="number" step="0.1" name="albumin" value={formData.albumin} onChange={handleChange} />
      </div>

      <div>
        <label>Copper (μg/day):</label>
        <input type="number" name="copper" value={formData.copper} onChange={handleChange} />
      </div>

      <div>
        <label>Alkaline Phosphatase (U/L):</label>
        <input type="number" name="alkPhos" value={formData.alkPhos} onChange={handleChange} />
      </div>

      <div>
        <label>SGOT (U/mL):</label>
        <input type="number" name="sgot" value={formData.sgot} onChange={handleChange} />
      </div>

      <div>
        <label>Triglycerides (mg/dL):</label>
        <input type="number" name="triglycerides" value={formData.triglycerides} onChange={handleChange} />
      </div>

      <div>
        <label>Platelets (ml/1000):</label>
        <input type="number" name="platelets" value={formData.platelets} onChange={handleChange} />
      </div>

      <div>
        <label>Prothrombin time (seconds):</label>
        <input type="number" step="0.1" name="prothrombin" value={formData.prothrombin} onChange={handleChange} />
      </div>

      <div>
        <label>Stage:</label>
        <select name="stage" value={formData.stage} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormPage;
