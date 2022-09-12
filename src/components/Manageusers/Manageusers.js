import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Manageusers = () => {

    const [userdetails, setuserDeatils] = useState([])
    const [keyword, setkeyword] = useState('');
    const [newdata, setnewdata] = useState(null)

    useEffect(() => {
        axios.get(`/enroll/enroll/`).then((response) => {
            setuserDeatils(response.data);
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
        setnewdata(null)
    }, [newdata])
    // console.log(userdetails)


    const deleteuser = (id) => {
        axios.delete(`/enroll/enroll/${id}`).then((response) => {
            // setuserDeatils(response.data);
            console.log('deleted')
            toast.success('deleted', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
            setnewdata(true)

        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }
    return (
        <>
            <div className="recentpurchases-outer">
                <Navbar />
                <div className='head-main'>Manage Users</div>
                <div className='searchbar'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input placeholder='Search by username or email' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
                </div>
                <div className='table'>
                    <div className='table-head'>
                        <p className='table-sno'>Sno.</p>
                        <p className='table-small'>Name</p>
                        <p className='table-email'>Email</p>
                        <p className='table-small'>Gender</p>
                        <p className='table-small'>Active</p>
                        <p className='table-btn'>Delete</p>
                        <p className='table-btn'>Edit</p>

                    </div>
                    <div className='table-body'>
                        {
                            userdetails.filter((val) => {
                                if (keyword === '') {
                                    return val
                                }
                                else if (val.name.toLowerCase().includes(keyword) || val.email.toLowerCase().includes(keyword)) {
                                    return val
                                }

                            }).map((e, i) => {
                                return (

                                    <div className='table-row' key={e._id}>
                                        <p className='table-sno'>{i + 1}</p>
                                        <p className='table-small'>{e.name}</p>
                                        <p className='table-email'>{e.email}</p>
                                        <p className='table-small'>{e.gender}</p>
                                        <p className='table-small'>{e.active.toString()}</p>
                                        <p className='table-btn' onClick={() => deleteuser(e._id)}>Delete</p>
                                        <Link to={`/edituserdetails/${e.email}`} style={{ textDecoration: 'none' }}>
                                            <p className='table-btn'>Edit</p>
                                        </Link>
                                    </div>
                                )
                            })
                        }



                    </div>
                </div>
            </div><ToastContainer /></>
    )
}

export default Manageusers