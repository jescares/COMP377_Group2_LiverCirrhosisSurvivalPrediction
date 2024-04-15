import React from 'react';
import './style.css'; 

const Homepage = () => {
  return (
    <div>
      <div className="topnav">
        <a className="active" href="#home">Home</a>
        <a href="/login-page">Login</a>
        <a href="/prediction-form">Predictor</a>
      </div><br></br><br></br>
      <div className="container">
        <h1>Liver Cirrhosis Survival Predictor</h1>
        <p>
        The Liver Cirrhosis Survival Predictor app is a powerful tool designed to provide individuals with valuable insights into their prognosis based on various medical parameters. Users can input relevant data such as age, gender, alcohol consumption, liver function tests, imaging results, and comorbidities.<br></br><br></br>
        The app utilizes advanced predictive algorithms to analyze this data and generate a personalized prediction regarding the user's likelihood of survival and their eventual outcome. The primary target variable includes three categories: "C" for survived, "CL" for survival due to treatment, and "D" for death. <br></br><br></br>
        By leveraging cutting-edge technology and medical research, the Liver Cirrhosis Survival Predictor app empowers users and healthcare professionals to make informed decisions about treatment strategies, patient management, and overall care planning. This user-friendly interface provides crucial insights that can significantly impact patient outcomes and quality of life.<br></br><br></br>
        </p>
      </div>
    </div>
  );
};

export default Homepage;
