// react
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';

// pages
import CustomSidebar from './components/organism/Sidebar/CustomSidebar';
import LoginPage from './pages/LoginPage/Login';
import DashboardPage from './pages/DashboardPage/Dashboard';
import HomePage from './pages/HomePage/Homepage';
// error pages
import NotFoundPage from './pages/ErrorPages/NotFoundPage.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* public*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      {/* protected*/}
        {isLoggedIn ? (
          <Route
            path="/dashboard"
            element={
              <>
                <CustomSidebar />
                <DashboardPage />
              </>
            }
          />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/" />} />
        )}
        {/* catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;




/*

last ver: aug3th 2:57pm
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          {/* check log direct to dashboard }
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      {/* nav bar on homepage }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        {/* logged in -> dashboard page }
        {isLoggedIn ? (
          <Route
            path="/dashboard"
            element={
              <>
                <Sidebar className="app">
                  <Menu>
                  menuItemStyles={{
                    // the active class will be added automatically by react router -> so we can use it to style the active menu item
                    button: {
                        [`&.active`]: {
                        backgroundColor: '#13395e', //navy
                        color: '#b6c8d9', //denim blue
                      },
                    },
                  }}
                    <MenuItem component={<Link to="/dashboard" />}> Dashboard</MenuItem>
                    <MenuItem component={<Link to="/calendar" />}> Overview</MenuItem>
                    <MenuItem component={<Link to="/e-commerce" />}> Status</MenuItem>
                    <MenuItem component={<Link to="/calendar" />}> Manage user</MenuItem>
                    <MenuItem component={<Link to="/e-commerce" />}> Performance</MenuItem>
                  </Menu>
                </Sidebar>;             
              </>
            }
          />
        ) : (
          // Redirect to the homepage if != logged
          <Route
            path="/dashboard"
            element={<Navigate to="/" />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;

*/

