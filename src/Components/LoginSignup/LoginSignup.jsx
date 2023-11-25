import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { app } from './firebase_config';
<<<<<<< HEAD
import { doc, setDoc } from "firebase/firestore";
=======
>>>>>>> c0566cd0e429cc2f38383be16df7fe08af140680

const auth = getAuth(app);
const db = getFirestore(app);

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [name, setName] = useState(''); // 이름 상태
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const saveUserData = async (userId, userData) => {
    try {
<<<<<<< HEAD
      // 'users' 컬렉션 내에 사용자의 uid를 문서 ID로 사용하여 문서를 생성하거나 업데이트합니다.
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, userData);
      console.log("User data saved successfully with UID as document ID");
    } catch (error) {
      console.error("Error saving user data with UID as document ID: ", error);
    }
  }
  
=======
      await addDoc(collection(db, "users"), {
        uid: userId,
        ...userData
      });
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  }

>>>>>>> c0566cd0e429cc2f38383be16df7fe08af140680
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        name: name,
        gender: gender,
        email: email
      };
<<<<<<< HEAD
      // saveUserData 함수 호출 시, userCredential.user.uid를 문서 ID로 전달합니다.
      await saveUserData(userCredential.user.uid, userData);
      navigate('/map'); // 회원가입 성공 후 map 페이지로 이동합니다.
=======
      await saveUserData(userCredential.user.uid, userData);
      setAction('Login');
>>>>>>> c0566cd0e429cc2f38383be16df7fe08af140680
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/map');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {action === 'Login' ? null : (
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
        </div>
      )}

      {action === 'Sign Up' && (
        <div className="input">
          <select value={gender} onChange={handleGenderChange}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      <div className="input">
        <img src={email_icon} alt="" />
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      </div>

      <div className="input">
        <img src={password_icon} alt="" />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </div>

      <div className="forgot-password">
        Lost Password? <span onClick={() => navigate('/password-reset')}>Click here</span>
      </div>

      <div className="submit-container">
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => {
            handleSignUp();
            setAction('Sign Up');
          }}
        >
          Sign up
        </div>
        
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            handleLogin();
            setAction('Login');
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
