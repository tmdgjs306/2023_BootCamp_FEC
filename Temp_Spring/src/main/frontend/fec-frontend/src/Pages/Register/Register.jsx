// react imports
import React from 'react'
import { Link } from 'react-router-dom';
// token
import axios from 'axios';
import { useAuth as AuthProvider } from '../../provider/AuthProvider';
// react icons
import { HiOutlineMail } from 'react-icons/hi'
import { AiFillLock } from 'react-icons/ai'
import { FaUserShield } from 'react-icons/fa'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
// css imports
import './Register.css'
import '../../App.css'
// assets
import video from '../../LoginAssets/video1.mp4';
import logo from '../../LoginAssets/logo.png';

const Register = () => {
  const { setToken } = useAuth();

  const [email, setEmail] = useState(''); // Add email state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        email, // Send email along with username and password
        username,
        password,
      });

      if (response.data.token) {
        setToken(response.data.token);
      }

      // Handle successful registration response here
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle registration error here
      console.error('Registration error:', error);
    }
  };
  return (
    <AuthProvider>
      <div className='loginPage flex'>

        <div className='container flex'>

          <div className='videoDiv'>
            <video src={video} autoPlay muted loop></video>
            <div className='textDiv'>
              <h2 className='title'>Friendly Easy Convenient</h2>
              <p className='p'>Smart monitoring web application</p>
            </div>
            <div className='footerDiv flex'>
              <span className='text'>Already have a account?</span>
              {/* need post jwt */}
              <Link to={'/login'}>
                <button className='btn'>Login</button>
              </Link>
            </div>
          </div>

          <div className='formDiv flex'>
            <div className='headerDiv'>
              <img src={logo} alt='Fec Logo' />
              <h3>Welcome to FEC!</h3>
            </div>

            <form onSubmit={handleRegister} className='form grid'> {/* Attach onSubmit handler */}
              {/*email input */}
              <div className='inputDiv'>
                <label htmlFor='email'>Email</label>
                <div className="input flex">
                  <HiOutlineMail className='icon' />
                  <input
                    type='email'
                    id='email'
                    placeholder='Your email'
                    value={email} // Bind the email state to the input value
                    onChange={(e) => setEmail(e.target.value)} // Handle input change
                  />
                </div>
              </div>

              {/*Button Register */}
              <button type='submit' className='btn flex'>
                <span>Register</span>
                <FaRegArrowAltCircleRight className='icon' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default Register;
