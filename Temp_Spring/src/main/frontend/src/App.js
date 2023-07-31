import Register from './Register';

function App() {

  return (
    <main className="App">
      <Register />
    </main>
  );
}

export default App;



// importing js
// import { NavBar } from './Scenes/Homepage/NavBarHome';
// import { Banner } from './Scenes/Homepage/BannerHome';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Login } from "./Components/Login.jsx";
// import { Register } from "./Components/Register.jsx";
// import {useState} from "react";

// function app() {
//     const [currentForm, setCurrentForm] = useState('login');
// // need other state for only administar account
//     const toggleForm = (formName) => {
//         setCurrentForm(formName);
//     }
// // gonna add route
//     return (
//         <div className="App">

//             {
//                 currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
//             }
            
//         </div>
//     );
// }
// // need to add route to pages
// export default App;