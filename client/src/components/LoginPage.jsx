import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

//   const handleSubmit = (event) => {
//   event.preventDefault();

//   if (!username.includes('@my.centennialcollege.ca')) {
//     setErrorMessage('Username must be a valid Centennial College email address.');
//     return;
//   }

//   // Post user data to GraphQL API
//   fetch('http://localhost:4000/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//         mutation {
//           addUser(username: "${username}", password: "${password}") {
//             id
//           }
//         }
//       `
//     })
//   })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));

//   window.location.href = '/prediction-form';
// };

const handleSubmit = (event) => {
  event.preventDefault();

  if (!username.includes('@my.centennialcollege.ca')) {
    setErrorMessage('Username must be a valid Centennial College email address.');
    return;
  }

 // Prepare GraphQL query
    const query = `
      query {
        login(username: "${username}", password: "${password}") {
          id
        }
      }
    `;

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query })
    })
    .then(r => r.json())
    .then(data => {
      if (data.data && data.data.login) {
        console.log('Login successful:', data);
        auth.login({username, password}, ()=> {
          navigate('/prediction-form');
        }
      )
      } else if (data.errors) {
        console.log('Login error:', data.errors);
        setErrorMessage('Login failed. Please check your username and password.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    });
};

  return (
    <div className="container">
      <h1>Liver Cirrhosis Survival Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your Centennial College email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
