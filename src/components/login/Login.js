import React, { useEffect, useState } from 'react'
import logoimg from '../photos/logo-img.png'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [pwd, setPassword] = useState('');

    const userdata = Cookies.get("admin");
    console.log("userdata Login");

    console.log(userdata);
    useEffect(() => {
        if (userdata) {
            navigate("/");
        }
    }, [userdata])
    const makeFieldsEmpty = () => {
        setEmail("");
        setPassword("");
    }

    const login = (e) => {
        e.preventDefault();
        const pathname = location?.state?.from?.pathname || "/";
        if (email && pwd) {
            try {
                axios.post('/admin/login',
                    JSON.stringify({ email, pwd }), {
                    headers: { "Content-Type": "application/json" }
                }).then((response) => {
                    console.log("response.data")

                    console.log(response.data)
                    Cookies.set("admin", JSON.stringify({ 'token': response.data.token, 'email': response.data.useremail.email }));
                    navigate(pathname, { replace: true })
                }).catch((e) => {
                    if (e.response.status === 404) {
                        toast.error(e.response.data, {
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            theme: 'colored'
                        });
                    }
                    if (e.response.status === 403) {
                        toast.error(e.response.data, {
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            theme: 'colored'
                        });
                    }
                });
                makeFieldsEmpty();
            } catch (err) {
                makeFieldsEmpty();
                toast.error(err, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
        } else {
            toast.error('Username and Password fields are required', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });

        }
    }

    return (
        <>
            <form>
                <div className='outer-login-container '>
                    <div className='login-container'>
                        <div className='login-left'>
                            <img src={logoimg} />
                        </div>
                        <div className='login-right'>
                            <h1>Admin Login</h1>
                            <br />
                            <label>Username</label>
                            <input type="text" name='email' id="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your username' />
                            <label>Password</label>
                            <input type="password" name='pwd' id="pwd"
                                value={pwd}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password' />
                            <Link to="/forgotpassword" className='fp'>Forgot password?</Link>
                            <input type="submit" onClick={login} value="submit" />
                            <hr className='light-grey-hr' />
                            {/* <p>Don't have an account? <Link to='/enrollnow'>Enroll now</Link></p> */}
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default Login