import React, { useState } from 'react';
import './Register.css';
import farmimg from '../../assets/image/farm.png';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  };

  return (
    <div className="register-container"> {/* Use the 'register-container' class */}
      <h2>Sign up for an Account</h2>
      <div className="register-form-container"> {/* Use the 'register-form-container' class */}
        <label>ID:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleRegister}>Register</button>
        
      </div>
        <div className="register-image">
          <img src={farmimg} alt="Farm3D" />
        </div>
    </div>
    
  );
};

export default RegisterPage;
