import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Leaderboard from '../Leaderboard/Leaderboard'
import Navbar from '../Navbar'
import Recentpurchases from '../Recentpurchases/Recentpurchases'
import './Dashboard.css'

const Dashboard = () => {

    const [invoices, setInvoices] = useState([]);
    const [keyword, setkeyword] = useState('');
    const [usersreg, setuserseg] = useState([])
    const [revenuegenerated, setrevenuegenerated] = useState(0)
    const [coursessold, setcoursessold] = useState(0)


    const [usertilltime, setusertilltime] = useState('1d')
    const [coursesoldtime, setcoursesoldtime] = useState('all')
    const [revenuetime, setrevenuetime] = useState('1d')
    // Invoice called
    useEffect(() => {
        axios.get(`/invoice/invoice`).then((response) => {
            setInvoices(response.data);
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [])

    // console.log(invoices)



    useEffect(() => {
        axios.get(`/enroll/enroll/`).then((response) => {
            setuserseg(response.data);
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [])




    const getdatedifference = (date1, date2) => {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        let diff = (dt2.getTime() - dt1.getTime()) / 1000;

        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }



    const currentdate = new Date()

    const usersreg1 = usersreg.filter(function (el) {
        if (usertilltime == '1d') {
            return getdatedifference(currentdate, el.createdAt) >= 0
        }


        if (usertilltime == '1m') {
            return getdatedifference(currentdate, el.createdAt) >= -30
        }
        if (usertilltime == '6m') {
            return getdatedifference(currentdate, el.createdAt) >= -185
        }

        if (usertilltime == '1y') {
            return getdatedifference(currentdate, el.createdAt) >= -365
        }
        if (usertilltime == 'all') {
            return el
        }

    }

    );
    const coursesold1 = invoices.filter(function (el) {

        if (coursesoldtime == '1d') {
            return getdatedifference(currentdate, el.createdAt) >= 0
        }


        if (coursesoldtime == '1m') {
            return getdatedifference(currentdate, el.createdAt) >= -30
        }
        if (coursesoldtime == '6m') {
            return getdatedifference(currentdate, el.createdAt) >= -185
        }

        if (coursesoldtime == '1y') {
            return getdatedifference(currentdate, el.createdAt) >= -365
        }
        if (coursesoldtime == 'all') {
            return el
        }
    }
    );

    const revenue1 = invoices.filter(function (el, i) {
        if (revenuetime == '1d') {
            return getdatedifference(currentdate, el.createdAt) >= 0
        }


        if (revenuetime == '1m') {
            return getdatedifference(currentdate, el.createdAt) >= -30
        }
        if (revenuetime == '6m') {
            return getdatedifference(currentdate, el.createdAt) >= -185
        }

        if (revenuetime == '1y') {
            return getdatedifference(currentdate, el.createdAt) >= -365
        }
        if (revenuetime == 'all') {
            return el
        }
    }
    );
    const revenuetotal = revenue1.reduce((accumulator, object) => {
        return accumulator + object.amount;
    }, 0)

    // console.log(revenue1)

    // console.log(usersreg)
    // console.log(invoices)



    invoices.sort(function (a, b) { return parseInt(`${new Date(b.createdAt).getFullYear()}` + `${new Date(b.createdAt).getMonth()}` + `${new Date(b.createdAt).getDate()}`) - parseInt(`${new Date(a.createdAt).getFullYear()}` + `${new Date(a.createdAt).getMonth()}` + `${new Date(a.createdAt).getDate()}`) })
    // console.log(invoices)
    // console.log(coursesold1)


    return (
        <>
            <div className='dashboard-outer'>
                <Navbar />
                <div className='dashborad-inner'>
                    <div className='head-main'>Admin Dashboard</div>
                    <div className='dashboard-indicators'>

                        <div className='statsbox bg1'>
                            <p>Courses Sold</p>
                            <h1>{coursesold1.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                            <div className='DMYA'>
                                <p className={coursesoldtime == '1d' ? 'active' : ''} onClick={() => setcoursesoldtime('1d')}>1D</p>
                                <p className={coursesoldtime == '1m' ? 'active' : ''} onClick={() => setcoursesoldtime('1m')}>1M</p>
                                <p className={coursesoldtime == '6m' ? 'active' : ''} onClick={() => setcoursesoldtime('6m')}>6M</p>
                                <p className={coursesoldtime == '1y' ? 'active' : ''} onClick={() => setcoursesoldtime('1y')}>1Y</p>
                                <p className={coursesoldtime == 'all' ? 'active' : ''} onClick={() => setcoursesoldtime('all')}>All</p>
                            </div>
                        </div>

                        <div className='statsbox bg2'>
                            <p>Revenue</p>
                            <h1>Rs.{revenuetotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                            <div className='DMYA'>
                                <p className={revenuetime == '1d' ? 'active' : ''} onClick={() => setrevenuetime('1d')}>1D</p>
                                <p className={revenuetime == '1m' ? 'active' : ''} onClick={() => setrevenuetime('1m')}>1M</p>
                                <p className={revenuetime == '6m' ? 'active' : ''} onClick={() => setrevenuetime('6m')}>6M</p>
                                <p className={revenuetime == '1y' ? 'active' : ''} onClick={() => setrevenuetime('1y')}>1Y</p>
                                <p className={revenuetime == 'all' ? 'active' : ''} onClick={() => setrevenuetime('all')}>All</p>
                            </div>
                        </div>

                        <div className='statsbox bg3'>
                            <p>Users Registered</p>
                            <h1>{usersreg1.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                            <div className='DMYA'>
                                <p className={usertilltime == '1d' ? 'active' : ''} onClick={() => setusertilltime('1d')}>1D</p>
                                <p className={usertilltime == '1m' ? 'active' : ''} onClick={() => setusertilltime('1m')}>1M</p>
                                <p className={usertilltime == '6m' ? 'active' : ''} onClick={() => setusertilltime('6m')}>6M</p>
                                <p className={usertilltime == '1y' ? 'active' : ''} onClick={() => setusertilltime('1y')}>1Y</p>
                                <p className={usertilltime == 'all' ? 'active' : ''} onClick={() => setusertilltime('all')}>All</p>
                            </div>
                        </div>
                    </div>
                    <Recentpurchases data={invoices} />
                </div>

            </div><ToastContainer /></>
    )
}

export default Dashboard