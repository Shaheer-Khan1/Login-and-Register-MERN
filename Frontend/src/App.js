import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

const App = () => {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
  );
};

export default App;
