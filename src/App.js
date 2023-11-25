import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; 
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Map from './Components/Map';
import BottomTabNav from './BottomTabNav'; // Import the bottom tab component
import './BottomTabNav.css'; // Import the styles for the bottom tab
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <BottomTabNav /> 
    </Router>
  );
}

export default App;
