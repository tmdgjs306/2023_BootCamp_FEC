// page imports
import Homepage from './Pages/Homepage/Homepage';
import Dashboard from './Pages/Protected/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
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
<<<<<<< Updated upstream
=======
  
>>>>>>> Stashed changes

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
