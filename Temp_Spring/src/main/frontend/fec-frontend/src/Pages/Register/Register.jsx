// react imports
import React from 'react'
import { Link } from 'react-router-dom';
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

          <form action='' className='form grid'>
            {/*email input */}
            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className="input flex">
                <HiOutlineMail className='icon' />
                <input type='email' id='email' placeholder='Your email' />
              </div>
            </div>

            {/*userId input */}
            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type='text' id='username' placeholder='Your ID' />
              </div>
            </div>

            {/*password input */}
            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className="input flex">
                <AiFillLock className='icon' />
                <input type='password' id='password' placeholder='Your password' />
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
