import React, { useEffect, useState } from 'react'
import '../Recentpurchases/RecentPurchases.css'
import Navbar from '../Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const Leaderboard = () => {

    const [lbdetails, setlbDeatils] = useState([])
    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get(`/common/leaderboard/`).then((response) => {
            setlbDeatils(response.data.sort((a,b)=>b.total_income-a.total_income));
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
                <div className='head-main'>Leaderboard</div>
                <div className='searchbar'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input placeholder='Search by username or coursename or date' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
                </div>
                <div className='table'>
                    <div className='table-head'>
                        <p className='table-sno'>Sno.</p>
                        <p className='table-small'>Email ID</p>
                        <p className='table-small'>User name</p>
                        <p className='table-small'>Total Amount</p>
                    </div>
                    <div className='table-body'>
                        {
                            lbdetails.filter((val) => {
                                if (keyword === '') {
                                    return val
                                }
                                else if (val.email.toLowerCase().includes(keyword)
                                    || val._id.toLowerCase().includes(keyword)) {
                                    return val
                                }

                            }).sort(function (a, b) { return a.total_income < b.total_income }).map((e, i) => {

                                return (
                                    <div className='table-row'>
                                        <p className='table-sno'>{i + 1}</p>
                                        <p className='table-small'>{e._id}</p>
                                        <p className='table-small'>{e.username}</p>
                                        <p className='table-small'>₹ {e.total_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>


            </div><ToastContainer /></>
    )
}

export default Leaderboard