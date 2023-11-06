import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { app } from './firebase_config';

const auth = getAuth(app);

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAction('Login');
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/map'); // Change from '/home' to '/map'
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
          <input type="text" placeholder="Student Id" />
        </div>
      )}

      <div className="input">
        <img src={user_icon} alt="" />
        <input type="text" placeholder="Name" />
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
      </div>

      <div className="input">
        <img src={email_icon} alt="" />
        <input type="email" placeholder="Email" onChange={handleEmailChange} />
      </div>

      <div className="input">
        <img src={password_icon} alt="" />
        <input type="password" placeholder="Password" onChange={handlePasswordChange} />
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