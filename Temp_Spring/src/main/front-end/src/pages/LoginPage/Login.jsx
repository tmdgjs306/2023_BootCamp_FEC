import React, { useState } from 'react';
import './Login.css';
import characteripng from '../../assets/image/character.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // redirect to dashboard
        navigate('/dashboard');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="right-section">
        <h2>Login to your Account</h2>
        <div className="form-group">
          <label>ID:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div className="register-image">
        <img src={characteripng} alt="Farm3D" />
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
