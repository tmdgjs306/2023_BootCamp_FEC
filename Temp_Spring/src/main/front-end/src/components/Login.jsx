import React, { useState } from 'react';
import axios from "axios";
const Login = () => {
  const [loginId, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      });
      if (response.ok) {
        // @set user token in local storage + redirect to dashboard
        console.log('Login successful');
        console.log(response);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={loginId} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
