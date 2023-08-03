import React from 'react';
import RegisterForm from '../molecules/RegisterForm';
import '.././Div.css';

const Div = ({ onSubmit }) => {
  return (
    <div className="nav-container">
      <h2>Sign up for an Account</h2>
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default Div;
