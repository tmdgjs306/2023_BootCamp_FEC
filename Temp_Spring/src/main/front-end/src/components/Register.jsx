import React, { useState } from 'react';

const Register = () => {
  const [loginId, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/join", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({ loginId, password ,email}),
      }).then(response => response.text())
          .then(data => {
              console.log(data);
          })
          .catch(error => console.error('Error occurred!! ', error));
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
          <label>Id:</label>
          <input type="text" value={loginId} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
