// react
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
// pages
import Login from './Pages/Login/Login';
import Homepage from './Pages/Homepage/Homepage';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Protected/Dashboard/Dashboard';
// other pages
import Questions from './Pages/Other/q&a.jsx';
import NotFoundPage from './Pages/Other/notfound.jsx';
import About from './Pages/Other/about';
import NotificationIcon from './Components/Header/Notification';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/frequently-asked-questions' element={<Questions />} />
        <Route path='/not-found' element={<NotFoundPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/notication' element={<NotificationIcon />} />

      </Routes>
    </Router>
  )
};

export default App;