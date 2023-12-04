import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom'; 

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = () => {
    setTimeout(() => {
      setResetSent(true);
      setResetSuccessful(true);
    }, 1000);
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h2>Password Reset</h2>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        {!resetSuccessful && (
          <>
            <p>Enter your email address to receive a password reset link.</p>
            <label style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box', borderRadius: '4px' }}
            />
            <button
              onClick={handleResetPassword}
              style={{
                background: '#4caf50',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Reset Password
            </button>
            {resetSent && <p style={{ marginTop: '10px' }}>Password reset email sent. Check your inbox for instructions.</p>}
          </>
        )}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
      {resetSuccessful && (
        <div style={{ marginTop: '20px' }}>
          <p>You can now log in with your new password.</p>
          <Link to="/" style={{ textDecoration: 'none', color: '#4caf50', fontWeight: 'bold' }}>
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
