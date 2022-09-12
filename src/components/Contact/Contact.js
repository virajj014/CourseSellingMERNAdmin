import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar'
import './Contact.css'
const Contact = () => {
    const [contactus, setcontactus] = useState([])

    useEffect(() => {
        axios.get(`/common/contactus/`).then((response) => {
            setcontactus(response.data.sort((a, b) =>  a.createdAt < b.createdAt ? 1 : -1 ));
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, []);


    return (
        <>
            <div className="recentpurchases-outer">
                <Navbar />
                <div className='head-main'>Contact Requests</div>
                <div className='searchbar'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input placeholder='Search by username or coursename or date' />
                </div>
                <div className='table'>
                    <div className='table-head'>
                        <p className='table-sno'>Sno.</p>
                        <p className='table-small'>Name</p>
                        <p className='table-small'>Email ID</p>
                        <p className='table-wide'>Message</p>
                        <p className='table-small'>Time</p>

                    </div>
                    <div className='table-body'>
                        {
                            contactus.sort(function (a, b) { return a.total_income < b.total_income }).map((e, i) => {

                                return (
                                    <div className='table-row'>
                                        <p className='table-sno'>{i + 1}</p>
                                        <p className='table-small'>{e.contactName}</p>
                                        <p className='table-small'>{e.contactEmail}</p>
                                        <p className='table-wide'>{e.contactMessage}</p>
                                        <p className='table-small'>{new Date(e.createdAt).toLocaleDateString()}, {new Date(e.createdAt).toLocaleTimeString()}</p>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>


            </div>
            <ToastContainer />
        </>
    )
}

export default Contact