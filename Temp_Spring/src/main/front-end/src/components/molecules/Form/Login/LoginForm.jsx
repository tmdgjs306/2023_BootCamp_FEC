import React, { useState } from 'react';
import Input from './components/atoms/Input/Input.jsx';
import SubmitButton from './components/atoms/button/Submit/SubmitButton.jsx';

const LoginForm = () => {
  const [joinId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginIdChange = (event) => {
    setLoginId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // part for jwt
  };

  // returning login form
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Login</h1>

      <div className="form-floating">
        <Input
          type="text"
          value={joinId}
          onChange={handleLoginIdChange}
          placeholder="Your login ID"
        />
        <label htmlFor="floatingInput">ID</label>
      </div>

      <div className="form-floating">
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Your password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

export default LoginForm;
