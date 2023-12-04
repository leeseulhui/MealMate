import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import number_icon from '../Assets/number.png';
import { app } from './firebase_config';
import PasswordReset from './PasswordReset';


const auth = getAuth(app);
const db = getFirestore(app);

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  const navigateToPasswordReset = () => {
    setShowPasswordReset(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const saveUserData = async (userId, userData) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, userData);
      console.log('User data saved successfully with UID as document ID');
    } catch (error) {
      console.error('Error saving user data with UID as document ID: ', error);
    }
  };

  <div className="input">
    <input
      type="text"
      placeholder="Student ID"
      value={studentId}
      onChange={handleStudentIdChange}
    />
  </div>


  const handleSignUp = async () => {
    try {
      if (showPasswordReset) {
        // 비밀번호 재설정 로직
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
          name: name,
          gender: gender,
          email: email,
          studentId: studentId, // 학번 추가
        };
        await saveUserData(userCredential.user.uid, userData);
        navigate('/map');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/map');
    } catch (error) {
      console.error(error);
    }
  };
  return (

    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {showPasswordReset ? (
        <PasswordReset />
      ) : (
        <div>

          {action === 'Login' ? null : (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                style={{ width: '60%', display: 'inline-block' }}
              />
              {action === 'Sign Up' && (
                <select
                  value={gender}
                  onChange={handleGenderChange}
                  style={{
                    width: '35%',
                    display: 'inline-block',
                    marginLeft: '5%',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    color: '#444',
                  }}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
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

          <div className="input">
            <img src={number_icon} alt="" />
            <input type="text" placeholder="StudentID" value={studentId} onChange={handleStudentIdChange} />
          </div>

          <div className="forgot-password">
            Lost Password?{' '}
            <span onClick={navigateToPasswordReset} style={{ cursor: 'pointer', color: 'blue' }}>
              Click here
            </span>
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
      )}
    </div>
  );

};

export default LoginSignup;
