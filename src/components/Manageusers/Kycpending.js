import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Kycpending.css'
import { Link } from 'react-router-dom';

const Pendingkyc = () => {
    const [kycdetails, setkycDeatils] = useState([])
    const [kyctype, setkyctype] = useState('')
    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get(`/kyc/kyc/`).then((response) => {
            setkycDeatils(response.data);
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
    // console.log(kycdetails)
    // console.log(keyword)


    const handlekycstaus = (e) => {

        // console.log(e.target.value)
        if (e.target.value === 'all') {
            setkyctype('')
        }
        if (e.target.value === 'Pending') {
            setkyctype('Pending')
        }
        else if (e.target.value === 'Approved') {
            setkyctype('Approved')
        }
        else if (e.target.value === 'Rejected') {
            setkyctype('Rejected')
        }
    }
    return (
        <><div className="recentpurchases-outer">
            <Navbar />
            <div className='head-main'> Kyc Requests Status</div>
            <div className='search-sort'>
                <div className='searchbar'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input placeholder='Search by name or email' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
                </div>

                <div className='kycfilterstatus'>
                    <p>Sort by Status</p>
                    <select onChange={handlekycstaus}>
                        <option value='all'>Show all</option>
                        <option value='Pending'>Pending</option>
                        <option value='Approved'>Approved</option>
                        <option value='Rejected'>Rejected</option>
                    </select>
                </div>
            </div>

            <div className='table'>
                <div className='table-head'>
                    <p className='table-sno'>Sno.</p>
                    <p className='table-small'>Name</p>
                    <p className='table-email'>Email</p>
                    <p className='table-small'>Verified</p>
                    <p className='table-btn'>View</p>
                </div>
                <div className='table-body'>
                    {kycdetails.filter((val) => {
                        if (kyctype === '') {
                            return val
                        }
                        else if (val.verified.includes(kyctype)) {
                            return val
                        }

                    }).filter((val) => {
                        if (keyword === '') {
                            return val
                        }
                        else if (val.uname.toLowerCase().includes(keyword) || val.email.toLowerCase().includes(keyword)) {
                            return val
                        }

                    }).map((e, i) => {
                        return (
                            <div className='table-row' key={i}>
                                <p className='table-sno'>{i + 1}</p>
                                <p className='table-small'>{e.uname}</p>
                                <p className='table-email'>{e.email}</p>
                                <p className='table-small'>{e.verified}</p>
                                <Link to={`/userkyc/${e.userid}`} style={{ textDecoration: 'none' }}><p className='table-btn'>View</p></Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </div><ToastContainer/></>
    )
}

export default Pendingkyc