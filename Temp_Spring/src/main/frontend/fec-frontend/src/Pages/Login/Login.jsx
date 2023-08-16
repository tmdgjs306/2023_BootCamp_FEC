// react imports
import React from 'react'
import { Link } from 'react-router-dom';
// // token
// import axios from 'axios';
// import { useAuth } from '../../provider/AuthProvider';
// react icons
import { FaUserShield } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
// css imports
import './Login.css'
import '../../App.css'
// assets
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';


const Login = () => {
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
                        <span className='text'>Don't have a account?</span>
                        <Link to={'/join'}>
                            <button className='btn'>Join now</button>
                        </Link>
                    </div>
                </div>

                <div className='formDiv flex'>
                    <div className='headerDiv'>
                        <img src={logo} alt='Fec Logo' />
                        <h3>Welcome back!</h3>
                    </div>

                    <form action='' className='form grid'>
                        <span className='showMessage'>Login Status will go here</span>
                        {/*user input */}
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

                        {/*Button login */}
                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <FaRegArrowAltCircleRight className='icon' />
                        </button>

                        {/* option for forgot password */}
                        <span className='forgotPassword'>
                            Forgot your password? <a href='/join'>Click here</a>
                        </span>
                        {/*Option for go to homepage */}
                        <span className='forgotPassword'>
                            Go Fec home? <a href='/'>Go home</a>
                        </span>

                    </form>
                </div>

            </div>
        </div>
    )

}

export default Login;
