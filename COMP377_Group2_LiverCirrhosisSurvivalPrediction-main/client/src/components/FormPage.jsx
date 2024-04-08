import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

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

    // Example submission logic, replace 'YOUR_BACKEND_ENDPOINT' with your actual endpoint
    console.log(submissionData);
    // Assuming you would call your backend API here and then:
    // history.push('/prediction', { predictionData: 'Your Prediction Result' });

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

      {/* Include other fields similarly, example for Ascites */}
      <div>
        <label>Ascites:</label>
        <select name="ascites" value={formData.ascites} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>
      
      {/* Repeat for all other fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormPage;
