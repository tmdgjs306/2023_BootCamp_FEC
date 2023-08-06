import './App.css';
import Homepage from './Components/Homepage/Homepage';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

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

])



//
function App() {

  return (
    <div>
      <RouterProvider router={router}/>

      
    </div>
  )
}

export default App
