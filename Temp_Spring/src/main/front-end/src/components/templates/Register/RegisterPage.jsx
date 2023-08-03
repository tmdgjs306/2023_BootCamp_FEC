import React from 'react';
import Nav from '../organisms/Nav';
import './RegisterPage.css';
import farmimg from '../../assets/image/farm.png';

const RegisterPage = () => {
  const handleRegister = async ({ username, email, password }) => {
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
    <div className="register-container">
      <Nav onSubmit={handleRegister} />
      <div className="register-image">
        <img src={farmimg} alt="Farm3D" />
      </div>
    </div>
  );
};

export default RegisterPage;
