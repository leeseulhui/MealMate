import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/Components/Home'; 
import LoginSignup from '../src/Components/LoginSignup/LoginSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginSignup />} />
        
      </Routes>
    </Router>
  );
}

export default App;
