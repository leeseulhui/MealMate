import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from './pages/signin';
import SignUp from "./pages/SignUp"; 
import { auth } from "./firebase_config";
import Map from "./pages/Map";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
if (location.pathname === '/map') {
    return null;
  }
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', marginTop: '50px' }}>
      <div>
        <img src="/logo.png" alt="Logo" style={{ width: "100px", height: "auto" }} />
      </div>
      {!isAuthPage && (
        <div style={{ display:'flex', justifyContent:'center', marginTop:'20px'}}>
          <Link to="/login" style={{          
            marginRight: '20px',
            backgroundColor: '#81DAF5',
            color:'white',
            textDecoration:'none',
            padding:'10px 20px',
            borderRadius:'5px'
          }}>로그인</Link>
          
          <Link to="/signup" style={{
            backgroundColor:'#81DAF5', 
            color:'white', 
            textDecoration:'none',
            padding:'10px 20px', 
            borderRadius:'5px'
          }}>회원가입</Link>
        </div>
      )}
    </nav>
  );
}

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

   // 로그아웃
  //  const logout=async()=>{
  //   try{
  //     await signOut(auth);
  //     setUser(null); 
  //   }catch(error){
  //     console.log(error.message)
  //   }
  // }
   return (
    <Router>
      <div style={{ textAlign: "center", margin: 0 }}>
        <Navigation />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>);
};

export default App;
