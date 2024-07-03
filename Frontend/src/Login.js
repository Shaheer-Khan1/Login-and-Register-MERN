import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id: '570370558887-kmj9qkovuoovbsek3cmurcd20gt0k3ku.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    // Render the Google Sign-In button
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post('http://localhost:5000/api/google-login', {
        idToken: credential,
      });

      alert(`Logged in successfully`);
      navigate('/Home');
    } catch (error) {
      alert(`Error logging in with Google: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      alert(`Logged in successfully as ${response.data.username}`);
      navigate('/Home');
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(`Error logging in: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGoToRegister = () => {
    navigate('/signup');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Login</button>
        <div id="googleSignInDiv"></div>
        <button type="button" className="btn-submit" onClick={handleGoToRegister}>
          Go to Register
        </button>
      </form>
    </div>
  );
};

export default Login;
