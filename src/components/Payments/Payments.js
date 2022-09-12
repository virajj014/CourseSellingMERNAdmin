import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Navbar'

const Payments = () => {
    const [payments, setpayments] = useState([])
    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get(`/common/leaderboard/`).then((response) => {
            setpayments(response.data);
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


    

    console.log(payments)



    const gettotalincomeofauser = (the_email) => {
        // const [invoice, setInvoices] = setState([])

        const getinvoices = () => {
            axios.get(`/common/leaderboard`).then((response) => {
                return response.data.filter((e) => {

                    if (e._id === the_email) {
                        return e
                    }
                });

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




        let prevpayments = axios.get(`/common/payment/user_email/${the_email}`).then((response) => {
            return response.data;
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })





        const invoices = getinvoices()
        console.log(getinvoices())
        console.log(prevpayments)

        // const paidamt = prevpayments.reduce((accumulator, object) => {
        //     return accumulator + object.amount_paid;
        // }, 0)

        // const totalincome = invoices.reduce((accumulator, object) => {
        //     console.log(accumulator + object.total_income)
        //     return accumulator + object.total_income;
        // }, 0)

        // const tremainingamt = totalincome - paidamt
    }

    gettotalincomeofauser("virajj014@gmail.com")
    return (
        <>
            <div className="recentpurchases-outer">
                <Navbar />
                <div className='head-main'>Pending Payments</div>
                <div className='searchbar'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input placeholder='Search by username or coursename or date' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
                </div>
                <div className='table'>
                    <div className='table-head'>
                        <p className='table-sno'>Sno.</p>
                        <p className='table-small'>Name</p>
                        <p className='table-email'>Email ID</p>

                        <p className='table-small'>Total Income</p>
                        <p className='table-small'>Paid amount</p>
                        <p className='table-small'>Pending Amount</p>
                        <p className='table-btn'>Pay</p>
                    </div>
                    <div className='table-body'>
                        {
                            payments.filter((val) => {
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
                                        <p className='table-small'>{e.username}</p>
                                        <p className='table-email'>{e._id}</p>

                                        <p className='table-small'>₹ {e.total_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                        <p className='table-small'>₹ {0}</p>
                                        <p className='table-small'>₹ {e.total_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                        <Link to={`/payto/${e._id}`} style={{ textDecoration: 'none' }}><p className='table-btn'>Pay</p></Link>
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

export default Payments