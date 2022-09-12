import React, { useState } from 'react'
import axios from 'axios';
import './Addcourse.css'
import Navbar from '../../Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addcourse = () => {
    const [course_name, setcoursename] = useState('')
    const [course_image, setcourseimg] = useState('')
    const [course_author, setcoursecreatorname] = useState('')
    const [course_description, setcoursedescription] = useState('')
    const [course_price, setcourseprice] = useState('')

    const formdata = new FormData();
    formdata.append('course_name', course_name);
    formdata.append('course_image', course_image);
    formdata.append('course_author', course_author);
    formdata.append('course_description', course_description);
    formdata.append('course_price', course_price);

    const PostData = async (e) => {
        e.preventDefault()
        console.log(typeof (course_image))
        axios.post('/course/course', formdata).then((response) => {
            if (response.status === (400)) {
                toast.error(e.response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
            if (response.status === (200)) {
                toast.success("successfull!", {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }

        }).catch((e) => {
            if (e.response.status === 400) {
                toast.error(e.response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
        });
    }

    return (
        <>
        <div className="Addcourse-outer">
            <Navbar />
            <div className='head-main'> Add New Course </div>
            <div className='new-form'>
                <form method='POST' encType='multipart/form-data'>

                    <input onChange={(e) => { setcoursename(e.target.value) }} placeholder='Enter Course Title' />
                    <input onChange={(e) => { setcoursecreatorname(e.target.value) }} placeholder='Enter Course Creator Name' />
                    <input onChange={(e) => { setcourseprice(e.target.value) }} placeholder='Enter Course Price in Rupees' type='number' />
                    {/* <input onChange={(e) => { setcourseoffer(e.target.value) }} placeholder='Enter Offer Price in Rupees' type='number' /> */}

                    <input type='file' filename='course_image' onChange={(e) => { setcourseimg(e.target.files[0]) }} placeholder='Upload Course Thumbnail' accept='image/jpeg,image/jpg,image/png' />

                    <textarea onChange={(e) => { setcoursedescription(e.target.value) }} rows={3} placeholder='Course Description'></textarea>
                    <button onClick={PostData}>Submit</button>
                </form>
            </div>
            
        </div><ToastContainer /></>
    )
}

export default Addcourse