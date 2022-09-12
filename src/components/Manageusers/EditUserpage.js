import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditUserpage.css'

import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar'
const EditUserpage = () => {
    const { uid } = useParams();
    let navigate = useNavigate();
    const [useractive, setUseractive] = useState();
    const initialValues1 = {
        username: "",
        userloginid: "",
        email: "",
        gender: "",
        country: "",
        usercity: "",
        mobileNo: "",
        usercitypincode: "",
        state: "",
        dob: "",
        useraddress: "",
    }
    const [userdetails, setuserDeatils] = useState([initialValues1])

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setuserDeatils({ ...userdetails, [name]: value });
    }
    const id = userdetails[0]._id;
    console.log(id)

    const updateUserProfile = (e) => {
        e.preventDefault();
        const { gender, country, city, state, mobileNo, pincode, dob, address } = userdetails;
        axios.patch(`/enroll/enroll/${id}`,
            JSON.stringify({ gender, country, city, state, mobileNo, pincode, dob, address }), {
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
        }).then((response) => {
            console.log(response.data)
            toast.success("saved successfully..", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
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
    // console.log(updateUserProfile)
    useEffect(() => {
        axios.get(`/enroll/enroll/email/${uid}`).then((response) => {
            setuserDeatils([response.data[0]]);
            setUseractive(userdetails[0].active);
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
    const { gender, country, city, state, pincode, dob, address } = userdetails[0];




    const Deleteuser = (e) => {
        e.preventDefault();

        axios.delete(`/enroll/enroll/${id}`).then((response) => {
            setuserDeatils(response.data);
            toast.success(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
            navigate("/manageusers")
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

    console.log(userdetails)


    return (

        <>
            <div className="user-profile">
                <Navbar />
                <div className='head-main'>Edit / Delete User Data</div>
                <div className="userprofile-container">
                    <form>
                        <div className='content-half'>
                            <label>Name</label>
                            <input name='username' value={userdetails[0].name} onChange={handleInputs} />
                        </div>

                        <div className='content-half'>
                            <label>Login Id</label>
                            <input disabled name='userloginid' value={userdetails[0].email} />
                        </div>
                        {useractive == true ? <div className='btn-group1'>
                            <button className='active'>Active</button>
                            <button onClick={() => { setUseractive(false) }}>Inactive</button>
                        </div> : <div className='btn-group1'>
                            <button onClick={() => { setUseractive(true) }}>Active</button>
                            <button className='active'>Inactive</button>
                        </div>}
                        <div className='content-half'>
                            <label>Email</label>
                            <input disabled name='useremail' value={userdetails[0].email} />
                        </div>
                        <div className='content-half'>
                            <label>Mobile Number</label>
                            <input name='mobileNo' defaultValue={userdetails[0].mobileNo} onChange={handleInputs} />
                        </div>
                        <div className='content-half'>
                            <label>Gender</label>
                            <select id="gender" name='gender' defaultValue={gender} onChange={handleInputs}>
                                <option disabled>{gender}</option>
                                <option >Male</option>
                                <option >Female</option>
                                <option >Other</option>
                            </select>
                        </div>
                        <div className='content-half'>
                            <label>DOB</label>
                            <input type="date" name='dob' defaultValue={dob.substring(0, 10)} onChange={handleInputs} />
                        </div>
                        <div className='content-half'>
                            <label>Select Country</label>
                            <select id="country" name='country' defaultValue={country} onChange={handleInputs} >
                                <option disabled>{country}</option>
                                <option>India</option>
                            </select>
                        </div>
                        <div className='content-half'>
                            <label>Select State</label>
                            <select id="state" name="state" defaultValue={state} onChange={handleInputs} >
                                <option disabled>{state}</option>
                                <option>MP</option>
                                <option>UP</option>
                                <option>AP</option>
                                <option>JB</option>
                                <option>KP</option>
                                <option>NP</option>
                            </select>
                        </div>
                        <div className='content-half'>
                            <label>Enter City</label>
                            <input name='city' defaultValue={city} onChange={handleInputs} />
                        </div>
                        <div className='content-half'>
                            <label>Pin Code</label>
                            <input name='pincode' defaultValue={pincode} onChange={handleInputs} />
                        </div>
                        <div className='contfullwidth'>
                            <label>Address</label>
                            <textarea name='address' defaultValue={address} onChange={handleInputs} />
                        </div>

                        <div className='btn-group'>
                            <button onClick={updateUserProfile}>Save Changes</button>
                            <button onClick={Deleteuser}>Delete User</button>
                        </div>

                    </form>
                </div>


            </div>
            <ToastContainer />
        </>
    )
}

export default EditUserpage