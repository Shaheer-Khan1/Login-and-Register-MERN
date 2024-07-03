import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    // Validate password match
    if (password !== repassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        email,
        password,
      });
      
      // Handle the response from the backend
      alert(`Sign up successful: ${response.data.message}`);
      
      // Reset form fields after successful submission
      setUsername('');
      setEmail('');
      setPassword('');
      setRepassword('');
      navigate('/');
    } catch (error) {
      // Handle any errors from the request
      alert(`Error signing up: ${error.response?.data?.message || error.message}`);
    }
  };


  const handleGoToLogin = () => {
    navigate('/'); // Navigate to the Login page
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <div>
          <label htmlFor="repassword">Re-Enter Password:</label>
          <input
            type="password"
            id="repassword"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Sign Up</button>
        <button type="button" className="btn-submit" onClick={handleGoToLogin}>
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
