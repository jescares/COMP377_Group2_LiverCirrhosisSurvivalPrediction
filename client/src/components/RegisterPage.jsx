import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userData.username || !userData.password) {
      setErrorMessage('Username and password are required');
      return;
    }

    // Construct the GraphQL mutation
    const mutation = `
      mutation {
        addUser(username: "${userData.username}", password: "${userData.password}") {
          id
        }
      }
    `;

    axios.post('http://localhost:4000/graphql', {
      query: mutation
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => {
      if (response.data.data && response.data.data.addUser) {
        console.log('Registration successful:', response.data);
        navigate('/login-page'); // Navigate after successful registration
      } else if (response.data.errors) {
        console.log('Registration error:', response.data.errors);
        setErrorMessage('Registration failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('Failed to register. Please try again.');
    });
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Enter your username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Enter your password" />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default RegisterPage;
