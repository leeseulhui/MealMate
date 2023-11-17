import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/Components/Home'; 
import LoginSignup from '../src/Components/LoginSignup/LoginSignup';
import Map from '../src/Components/Map'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
