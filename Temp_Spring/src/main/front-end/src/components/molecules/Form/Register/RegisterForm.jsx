import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import './RegisterForm.css';

const RegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    onSubmit({ username, email, password });
  };

  return (
    <div className="register-form-container">
      <label>ID</label>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Email</label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default RegisterForm;
