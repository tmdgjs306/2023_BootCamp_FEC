import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

const CustomSidebar = () => {
  return (
    <Sidebar className="app">
      <Menu>
        <MenuItem>
          <Link to="/dashboard">Dashboard</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/overview">Overview</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/status">Status</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/manage">Manage user</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/performance">Performance</Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;


/*
last version: aug.8 2:52pm

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard/overview">Overview</Link>
        </li>
        <li>
          <Link to="/dashboard/status">Status</Link>
        </li>
        <li>
          <Link to="/dashboard/manageusers">Manage Users</Link>
        </li>
        <li>
          <Link to="/dashboard/performance">Performance</Link>
        </li>
        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
*/