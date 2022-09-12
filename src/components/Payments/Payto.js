import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import './Payto.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'

const Payto = () => {
    const { uemail } = useParams();
    const [userdetails, setuserdetails] = useState([])
    const [remainingamt, setremainingamt] = useState(0)
    const [totalncome, setotalincome] = useState(0)
    const [paidamt, setpaidamt] = useState(0)


    useEffect(() => {
        axios.get(`/enroll/enroll/email/${uemail}`).then((response) => {
            setuserdetails([response.data[0]]);
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [uemail])
    // console.log(uemail)
    // console.log(userdetails[0])



    // total income
    const [invoices, setInvoices] = useState([])
    useEffect(() => {
        axios.get(`/common/leaderboard`).then((response) => {
            setInvoices(response.data.filter((e) => {

                if (e._id === userdetails[0]?.email) {
                    return e
                }
            }));

        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [userdetails])
    // console.log(invoices)




    // PREVIOUS PAYMENTS
    const [prevpayments, setprevPayments] = useState([])
    useEffect(() => {
        axios.get(`/common/payment/user_email/${uemail}`).then((response) => {
            setprevPayments(response.data);


        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })

    }, [uemail])

    console.log(prevpayments)

    useEffect(() => {

        setpaidamt(prevpayments.reduce((accumulator, object) => {
            return accumulator + object.amount_paid;
        }, 0)
        )
        setotalincome(invoices.reduce((accumulator, object) => {
            console.log(accumulator + object.total_income)
            return accumulator + object.total_income;
        }, 0))
        setremainingamt(totalncome - paidamt)

    }, [invoices, prevpayments])



    // console.log(paidamt)



    // pay user  form
    const [paypendingamt, setpaypending] = useState(0)
    const [paymentproof, setpaymentproof] = useState('')
    const [paymentdate, setpaymentdate] = useState()
    const addPaymentformdata = new FormData();
    addPaymentformdata.append('user_id', userdetails[0]?.id)
    addPaymentformdata.append('user_email', userdetails[0]?.email)
    addPaymentformdata.append('referralCode', userdetails[0]?.referralCode)
    addPaymentformdata.append('amount_paid', paypendingamt)
    addPaymentformdata.append('payment_date', paymentdate)
    addPaymentformdata.append('payment_proof', paymentproof)


    const paytouser = (e) => {
        console.log('payment fn called')
        e.preventDefault();

        axios.post(`/common/payment/`, addPaymentformdata).then((response) => {
            // setprevPayments(response.data)

            axios.get(`/invoice/invoice`).then((response) => {
                setInvoices(response.data.filter((invoice) => {
                    if (invoice.referred_by === userdetails[0]?.referralCode) {
                        return invoice
                    }
                }));

            }).catch((e) => {
                toast.error(e, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            })




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

    // console.lo(totalncome)

    return (

        <>
            <div className="recentpurchases-outer">
                <Navbar />
                <div className='head-main'>Pay to user</div>
                <div className='payto-user-detail'>
                    {userdetails[0] && <div className='payto-s1'> <p><span>Name </span>{userdetails[0].name}</p>
                        <p><span>Email </span>{userdetails[0].email}</p>
                        <p><span>Referral Code </span>{userdetails[0].referralCode}</p>
                    </div>}
                    <div className="payto-vr"></div>
                    <div className="payto-s2">
                        <p>Total Income</p>
                        <h1>₹ {totalncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                    </div>
                    <div className="payto-vr"></div>
                    <div className="payto-s3">
                        <p>Remaining Amount</p>
                        <h1>₹ {remainingamt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                    </div>
                </div>
                <div className="payto-s4">
                    <div className='payto-table'>
                        <div className="table-head">
                            <p className='table-sno'>Sno.</p>
                            <p className='table-small'>Paid Amount</p>
                            <p className='table-small'>Date</p>
                            <p className='table-btn'>Payment Proof</p>
                        </div>
                        <div className='table-body'>
                            {prevpayments && prevpayments.map((prevpayment, index) =>
                                <div className='table-row' key={index + 1}>
                                    <p className='table-sno'>{index + 1}</p>
                                    <p className='table-small'>₹ {prevpayment.amount_paid}</p>
                                    <p className='table-small'>{new Date(prevpayment.payment_date).toDateString()}</p>
                                    <Link to={`/${prevpayment.payment_proof}`} style={{ textDecoration: 'none' }}><p className='table-btn' >View</p></Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='payto-form'>
                        <h1>Pay Amount</h1>
                        <form>
                            <label>Amount</label>
                            <input placeholder='Enter Pending amount' value={paypendingamt} onChange={(e) => setpaypending(e.target.value)} type={'number'} />
                            <label>Payment proof</label>
                            <input placeholder='payment proof img' type='file' filename='payment_proof' onChange={(e) => setpaymentproof(e.target.files[0])} />
                            <label>Payment date</label>
                            <input placeholder='date' type={'date'} value={paymentdate} onChange={(e) => setpaymentdate(e.target.value)} />
                        </form>
                        <buton className='paybtn' onClick={(e) => paytouser(e)}>Submit</buton>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Payto