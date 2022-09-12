import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Kycuser.css'

const Kycuser = () => {

    const { userid } = useParams()


    // console.log(userid)

    const [kycdetails, setkycDeatils] = useState([])

    useEffect(() => {
        axios.get(`/kyc/kyc/${userid}`).then((response) => {
            setkycDeatils(response.data);
            // console.log(response.data);
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })

    }, [userid])

    // console.log(kycdetails)


    const approvekyc = (e) => {
        e.preventDefault();
        try {
            axios.patch(`/kyc/kyc/${userid}/Approved`).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    toast.success("Approved successfully..", {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    const rejectkyc = () => {
        try {
            axios.patch(`/kyc/kyc/${userid}/Rejected`).then((response) => {
                if (response.status === 200) {
                    toast.error("Rejected successfully..", {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
        <div className="kycuser-outer">
            <Navbar />
            <div className='head-main'> Kyc Details</div>
            <div className='kycform-container'>
                <div className='kyc-form'>
                    <div className='outer'>
                        <div className='inner'>
                            <label>Name</label>
                            <input disabled type="text" name="uname" value={kycdetails.uname} />
                        </div>
                        <div className='inner'>
                            <label>Email</label>
                            <input disabled type="text" name="email" value={kycdetails.email} />
                        </div>
                    </div>

                    <div className='outer'>
                        <div className='inner'>
                            <label>Mobile Number</label>
                            <input disabled type="text" name="mobileNumber" value={kycdetails.mobileNumber} />
                        </div>
                        <div className='inner'>
                            <label>Pin code</label>
                            <input disabled type="text" name="pinCode" value={kycdetails.pinCode} />
                        </div>
                    </div>

                    <div className='outer'>
                        <div className='inner'>
                            <label>City</label>
                            <input disabled type="text" name="city" value={kycdetails.city} />
                        </div>
                        <div className='inner'>
                            <label>State</label>
                            <input disabled type="text" name="state" value={kycdetails.state} />
                        </div>
                    </div>

                    <div className='outer'>
                        <div className='inner'>
                            <label>Aadhaar Number</label>
                            <input disabled type="text" name="aadharNumber" value={kycdetails.aadharNumber} />
                        </div>
                        <div className='inner'>
                            <label>Aadhaar Name</label>
                            <input disabled type="text" name="aadharName" value={kycdetails.aadharName} />
                        </div>
                    </div>

                    <div className='outer'>
                        <div className='inner'>
                            <label>Pan Number</label>
                            <input disabled type="text" name="panNumber" value={kycdetails.panNumber} />
                        </div>
                        <div className='inner'>
                            <label>Pan Name</label>
                            <input disabled type="text" name="panName" value={kycdetails.panName} />
                        </div>
                    </div>
                    <div className='outer'>
                        <div className='inner'>
                            <label>Bank Account number</label>
                            <input disabled type="text" name="bankAccountNumber" value={kycdetails.bankAccountNumber} />
                        </div>
                        <div className='inner'>
                            <label>Account Holder Name</label>
                            <input disabled type="text" name="accountHolderName" value={kycdetails.accountHolderName} />
                        </div>
                    </div>

                    <div className='outer'>
                        <div className='inner'>
                            <label>Bank Name</label>
                            <input disabled type="text" name="bankName" value={kycdetails.bankName} />
                        </div>
                        <div className='inner'>
                            <label>IFSC Code</label>
                            <input disabled type="text" name="ifscCode" value={kycdetails.ifscCode} />
                        </div>
                    </div>
                </div>
                <div className='hrline'></div>
                <div className='kyc-form1'>
                    <div className='outer'>
                        <div className='inner'>
                            <label>Aadhaar card with front & back (Pdf file) </label>
                            {kycdetails?.documents ?
                                <iframe title='aadhar' type="application/pdf" src={`http://localhost:5000/${kycdetails.documents[0]?.pdf_path}`} width="500px" height="500px" />
                                : 'Aadhaar Card not uploaded'}

                        </div>
                        <div className='inner'>

                            <label>Pan card (Pdf file)</label>
                            {kycdetails?.documents ?
                                <iframe title='aadhar' type="application/pdf" src={`http://localhost:5000/${kycdetails.documents[1]?.pdf_path}`} width="500px" height="500px" />
                                : 'Aadhaar Card not uploaded'}
                        </div>
                    </div>
                </div>
                <div className='hrline'></div>



                {kycdetails.verified == 'Pending' ?
                    <div className='btn-group'>

                        <button onClick={approvekyc} className='btn-approved'>Approve Kyc</button>


                        <button onClick={rejectkyc} className='btn-rejected'>Reject Kyc</button>
                    </div>
                    : <div className='btn-group'>
                        {kycdetails.verified == 'Rejected' ?
                            <button onClick={approvekyc} className='btn-approved'>Approve Kyc</button>
                            : <></>}
                        {kycdetails.verified == 'Approved' ?
                            <button onClick={rejectkyc} className='btn-rejected'>Reject Kyc</button> : <></>}
                    </div>}
            </div>
            

        </div><ToastContainer /></>
    )
}

export default Kycuser