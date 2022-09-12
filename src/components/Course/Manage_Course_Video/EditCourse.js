import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Navbar'
import ManageNav from './ManageNav'
import './EditCourse.css'

const EditCourse = () => {
    const { cid } = useParams();
    let navigate = useNavigate();

    /************************** start of Update course section ***************************************/

    const [course_name, setcoursename] = useState('')
    const [course_image, setcourseimg] = useState()
    const [course_author, setcoursecreatorname] = useState('')
    const [course_description, setcoursedescription] = useState('')
    const [course_price, setcourseprice] = useState('')
    const [offer_price, setofferprice] = useState('')

    useEffect(() => {
        try {
            axios.get(`/course/course/_id/${cid}`).then((response) => {
                // console.log(response.data[0])
                setcoursename(response.data[0].course_name)
                setcoursecreatorname(response.data[0].course_author)
                setcoursedescription(response.data[0].course_description)
                setcourseprice(response.data[0].course_price)
                setofferprice(response.data[0].offer_price)
                setcourseimg(response.data[0].course_image)
            }).catch((e) => {
                // console.log(e);
            })
        } catch (e) {
            // console.log(e);
        }
    }, [cid])



    const courseformdata = new FormData();
    courseformdata.append('course_name', course_name);
    courseformdata.append('course_image', course_image);
    courseformdata.append('course_author', course_author);
    courseformdata.append('course_description', course_description);
    courseformdata.append('course_price', course_price);
    if (offer_price) {
        courseformdata.append('offer_price', offer_price);

    }

    const updateCourseData = async (e) => {
        e.preventDefault()
        console.log(typeof (course_image))
        axios.patch(`/course/course/${cid}`, courseformdata).then((response) => {
            if (response.status === (404)) {
                toast.error(response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
            if (response.status === (400)) {
                toast.error(response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
            if (response.status === (200)) {
                toast.success(response.data, {
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
    /************************** End of Update course section ***************************************/

    /************************** start of  delete course section ***************************************/

    const deleteCourseData = async (e) => {
        e.preventDefault()
        console.log(typeof (course_image))
        axios.delete(`/course/course/${cid}`).then((response) => {
            if (response.status === (404)) {
                toast.error(response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
            if (response.status === (200)) {
                toast.success(response.data, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
                navigate("/managecourses")

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
    /************************** End of  delete course section ***************************************/

    return (
        <>
            <div className='editcourse-outer'>
                <Navbar />
                <ManageNav editcourse={true} addvideo={false} showvideos={false} courseid={cid} />
                <div className='head-main'> Update Course Data </div>
                <div className='new-form'>
                    <form method='PATCH' encType='multipart/form-data'>
                        <div className='form-inner'>
                            <div className='s1'>
                                <img src={`/${course_image}`} width="200px" />
                                <div>
                                    <label>Update Course Thumbnail</label>
                                    <input type='file' filename={course_image} onChange={(e) => { setcourseimg(e.target.files[0]) }} placeholder='Upload Course Thumbnail' accept='image/jpeg, image/png, image/jpg' />
                                </div>
                            </div>

                            <div className='s2'>
                                <div>
                                    <label>Course Name</label>
                                    <input onChange={(e) => { setcoursename(e.target.value) }} name='course_name' value={course_name} placeholder='Enter Course Title' />
                                </div>


                                <div>
                                    <label>Course Creator</label>
                                    <input onChange={(e) => { setcoursecreatorname(e.target.value) }} name='course_author' value={course_author} placeholder='Enter Course Creator Name' />
                                </div>


                                <div>
                                    <label>Course Price</label>
                                    <input onChange={(e) => { setcourseprice(e.target.value) }} value={course_price} placeholder='Enter Course Price in Rupees' type='number' />
                                </div>


                                <div>
                                    <label>Offer Price</label>
                                    <input onChange={(e) => { setofferprice(e.target.value) }} value={offer_price} placeholder='Enter offer Price in Rupees' type='number' />
                                </div>
                            </div>
                        </div>
                        <div className='hrline'></div>

                        <div className='s3'>
                            <label>Change Course Description</label>
                            <textarea onChange={(e) => { setcoursedescription(e.target.value) }} value={course_description} name='course_description' rows={3} placeholder='Course Description'></textarea>
                        </div>

                        <div className='s4'>
                            <button onClick={updateCourseData} >Submit</button>
                            <button onClick={deleteCourseData}>Delete this Course</button>
                        </div>
                    </form>
                </div>

            </div><ToastContainer /></>


    )
}

export default EditCourse