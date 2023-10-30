import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 // 회원가입
const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    
    if (user) {
      alert('회원가입이 완료되었습니다.'); 
    } else {
      console.log('회원가입 실패');
    }
  } catch(error) {
     if (error.code === 'auth/email-already-in-use') {
       alert('이미 등록된 이메일입니다.');
     } else {
       console.log(error.message);
     }
  }
};

   return (
     <div>
       <h2>회원가입</h2>
       <input placeholder="Email" style={{ 
        padding: '10px', 
        width: '200px', 
        marginBottom: '10px', 
        borderRadius:'5px', 
        fontFamily:'initial' }} 
        onChange={(e) => setEmail(e.target.value)} />
       <br />
       <input placeholder="Password" type="password" style={{
         padding: '10px', 
         width: '200px', 
         borderRadius:'5px', 
         fontFamily:'initial' }} 
         onChange={(e) => setPassword(e.target.value)} />
       <br />
       <button onClick={register} style={{
          marginTop:'10px',
          padding:'10px',
          backgroundColor:'#81DAF5',
          color:'white',
          border:'none',
          borderRadius:'5px',
          cursor:'pointer',
          fontFamily: 'initial'
        }}>회원가입</button>
     </div>
   );
};

export default SignUp;
