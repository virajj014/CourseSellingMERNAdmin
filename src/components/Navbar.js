import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import mainlogo from '../images/logofull1.png'
import './Navbar.css'
import Cookies from 'js-cookie';


const Navbar = () => {
    const location = useLocation()
    const userdata = Cookies.get("admin");
    // console.log("userdata");

    // console.log(userdata);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userdata) {
            navigate("/login");
        }
    }, [userdata])
    // console.log(location.pathname)



    const logout = () => {
        try {
            Cookies.remove('admin')
            // userprofdropclose()
            navigate('/login')
        } catch (err) {
            console.log(err.toString);
        }
    }


    return (
        <div className='adminnav'>
            <div className='s1'>
                <div className='left'>
                    <img src={mainlogo} />
                    <Link to='/'>{location.pathname == '/' ?
                        <button className='iconbtn-active'>

                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </button>
                        :

                        <button className='iconbtn-inactive'>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <p className={'notification-circle'}>

                            </p>
                        </button>
                    }</Link>


                    <Link to='/webinars'>{location.pathname == '/webinars' || location.pathname == '/marketingtools' || location.pathname == '/offer' || location.pathname == '/training' || location.pathname == '/homecarousel' ?
                        <button className='iconbtn-active'>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                        </button>
                        :

                        <button className='iconbtn-inactive'>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className={'notification-circle'}>

                            </p>
                        </button>
                    }</Link>

                    <Link to='/manageusers'>  {location.pathname == '/manageusers' ?
                        <button className='iconbtn-active'>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </button>
                        :

                        <button className='iconbtn-inactive'>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className={'notification-circle'}>

                            </p>
                        </button>}</Link>
                    <Link to='/contact' style={{ textDecoration: 'none' }}>
                        {location.pathname == '/contact' ?
                            <button className='iconbtn-active'>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                            :

                            <button className='iconbtn-inactive'>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <p className={'notification-circle'}>

                                </p>
                            </button>}
                    </Link>
                    <Link to='/payments' style={{ textDecoration: 'none' }}>
                        {location.pathname == '/payments' ?
                            <button className='iconbtn-active'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            :

                            <button className='iconbtn-inactive'>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className={'notification-circle'}>

                                </p>
                            </button>}
                    </Link>
                </div>

                <div className='right'>
                    <Link to='/leaderboard'><button className={location.pathname == '/leaderboard' ? 'btn-active' : 'btn-inactive'}>Leaderboard</button></Link>
                    <Link to='/addcourse'><button className={location.pathname == '/addcourse' ? 'btn-active' : 'btn-inactive'}>Add Course</button></Link>
                    <Link to='/managecourses'><button className={location.pathname == '/managecourses' ? 'btn-active' : 'btn-inactive'}>Manage Courses</button></Link>
                    <Link to='/kycstatus'><button className={location.pathname == '/kycstatus' ? 'btn-active' : 'btn-inactive'}>Kyc Status</button></Link>
                    {/* <Link to='/login'><button className={location.pathname == '/login' ? 'btn-active' : 'btn-inactive'}>login</button></Link> */}
                    <button variant="outline-info" className='btn-inactive' onClick={logout}>Logout</button>
                </div>
            </div>
            <div className='s2'>
                Smart Educates Admin Panel
            </div>
        </div>
    )
}

export default Navbar