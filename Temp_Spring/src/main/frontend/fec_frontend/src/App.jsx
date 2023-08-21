// page imports
import Homepage from './Pages/Homepage/Homepage';
import Dashboard from './Pages/Protected/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ManageUsers from "./Pages/Protected/ManageUsers/ManageUsers.jsx";
import UserProfile from "./Pages/Protected/Profile/UserProfile.jsx";
import Overview from "./Pages/Protected/Overview/Overview"
import Status from './Pages/Protected/Status/Status';
import Performance from "./Pages/Protected/Performance/Performance"
import ForbiddenPage from './Pages/OtherPages/ForbiddenPage'
import ErrorPage from './Pages/OtherPages/ErrorPage'
// css
import './index.css'
// Import React route dom

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// getting costumized child router from router

const publicRoutes = [
  { path: '/', element: <Homepage /> },
  { path: '/login', element: <Login /> },
  { path: '/join', element: <Register /> },
  { path: '/403', element: <ForbiddenPage /> },
  { path: '/404', element: <ErrorPage /> },
];

const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/manageuser', element: <ManageUsers /> },
  { path: '/profile', element: <UserProfile /> },
  { path: '/overview', element: <Overview /> },
  { path: '/status', element: <Status /> },
  { path: '/performance', element: <Performance /> },
];

const allRoutes = [...publicRoutes, ...protectedRoutes];

const router = createBrowserRouter(allRoutes);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
