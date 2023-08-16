// react imports
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// token
import axios from 'axios';
// import { useA } from '../../provider/AuthProvider';
// react icons
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai'
import { FaUserShield } from 'react-icons/fa'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
// css imports
import './Register.scss'
// assets
import video from '../../LoginAssets/video1.mp4';
import logo from '../../LoginAssets/logo.png';

const Register = () => {
  const [farmId, setFarmId] = useState('');
  const [email, setEmail] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let msg = "Error Msg ";
    const JsonObj = {
      farmId: `${farmId}`,
      loginId: `${loginId}`,
      email: `${email}`,
      password: `${password}`
    }
    const JsonString = JSON.stringify(JsonObj);
    try {
      const response = await axios.post('/api/join', JsonString, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
      alert(response.data.toString());

      // after successful register navigate to homepage
      navigate('/');
    } catch (error) {
      // Handle registration error here
      setFarmId("");
      setEmail("");
      setPassword("");
      setLoginId("");
      alert(error.response.data.message.toString());
    }
  };
  return (
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

              <div className='inputDiv'>
                <label htmlFor='farmId'>Farm ID</label>
                <div className="input flex">
                  <FaUserShield className='icon' />
                  <input
                      type='farmId'
                      id='farmId'
                      placeholder='Your farm ID'
                      value={farmId}
                      onChange={(e) => setFarmId(e.target.value)} // Handle input change
                  />
                </div>
              </div>
              <div className='inputDiv'>
                <label htmlFor='loginId'>ID</label>
                <div className="input flex">
                  <FaUserShield className='icon' />
                  <input
                      type='loginId'
                      id='loginId'
                      placeholder='Your ID'
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)} // Handle input change
                  />
                </div>
              </div>

              {/*email input */}
              <div className='inputDiv'>
                <label htmlFor='email'>Email</label>
                <div className="input flex">
                  <HiOutlineMail className='icon' />
                  <input
                      type='email'
                      id='email'
                      placeholder='Your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Handle input change
                  />
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor='password'>Password</label>
                <div className="input flex">
                  <AiFillLock className='icon' />
                  <input
                      type='password'
                      id='password'
                      placeholder='Your Password'
                      value={password} // Bind the email state to the input value
                      onChange={(e) => setPassword(e.target.value)} // Handle input change
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
  )
}

export default Register;