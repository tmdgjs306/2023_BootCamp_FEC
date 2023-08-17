// react imports
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// token
import axios from 'axios';
import { useA } from '../../provider/AuthProvider';
// react icons
import { FaUserShield } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
// css imports
import './Login.scss'

// assets
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';


const Login = () => {
    const { setToken } = useA(); // Use the setToken function from the AuthProvider

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    // navigator
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the default way
        const loginInfo = {
            loginId: `${loginId}`,
            password: `${password}`
        }
        const loginRequest = JSON.stringify(loginInfo);
        try {
            const response = await axios.post('/api/login', loginRequest, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            );
            if (response.data.token) {
                setToken(response.data.token); // Store the JWT token in the context
            }

            // Handle successful login response here
            navigate('/dashboard');
        } catch (error) {
            // Handle login error here
            console.error('Login error:', error);
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
                        <span className='text'>Don&apos;t have a account?</span>
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

                    <form action='' className='form grid' onSubmit={handleLogin}>
                        <span className='showMessage'>Login Status will go here</span>
                        {/*user input */}
                        <div className='inputDiv'>
                            <label htmlFor='username'>Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type='text' id='username' placeholder='Your ID' value={loginId} onChange={e => setLoginId(e.target.value)} />
                            </div>
                        </div>

                        {/*password input */}
                        <div className='inputDiv'>
                            <label htmlFor='password'>Password</label>
                            <div className="input flex">
                                <AiFillLock className='icon' />
                                <input type='password' id='password' placeholder='Your password' value={password} onChange={e => setPassword(e.target.value)} />
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

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;