import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  // 로그인
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/map"); // 로그인이 성공하면 "/map" 경로로 이동합니다.
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <div>
      <h3>로그인</h3>
      <input
      placeholder="Email"
      style={{ 
        height: '30px',
        marginRight : '10px',
        borderRadius : '8px',
        fontFamily: 'initial' }}
      onChange={(e) => setLoginEmail(e.target.value)}
    />
    <input
      placeholder="Password"
      type="password"
      style={{ 
        height: '30px',
        marginLeft : '10px',
        borderRadius : '8px',
        fontFamily:'initial' }} 
      onChange={(e) => setLoginPassword(e.target.value)}
    />
      <button onClick={login}style={{
        marginLeft : '10px',
          marginTop:'10px',
          padding:'10px',
          backgroundColor:'#81DAF5',
          color:'white',
          border:'none',
          borderRadius:'5px',
          cursor:'pointer',
          fontFamily:'initial'
          }}>로그인</button>
    </div>
  );
};

export default Signin;
