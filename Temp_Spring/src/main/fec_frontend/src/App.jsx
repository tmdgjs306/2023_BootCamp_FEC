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
import ForbiddenPage from "./Pages/OtherPages/ForbiddenPage.jsx";
// css
import './index.css'
// Import React route dom

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// getting costumized child router from router
const router = createBrowserRouter([
  {
    path: '/', element: <div><Homepage /></div>
  },
  {
    path: '/login', element: <div><Login /></div>
  },
  {
    path: '/join', element: <div><Register /></div>
  },
  {
    path: '/dashboard', element: <div><Dashboard /></div>
  },
  {
    path: '/manageuser', element: <div><ManageUsers /></div>
  },
  {
    path: '/profile', element: <div><UserProfile /></div>
  },
  {
    path: '/overview', element: <div><Overview /></div>
  },
  {
    path: '/status', element: <div><Status /></div>
  },
  {
    path: '/performance', element: <div><Performance /></div>
  },
  {
    path: '/forbidden', element: <div><ForbiddenPage/></div>
  }
])

//
function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
