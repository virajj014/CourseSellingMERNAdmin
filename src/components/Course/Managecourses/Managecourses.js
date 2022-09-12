import React, { useEffect, useState } from 'react'
import '../../Recentpurchases/RecentPurchases.css'
import Navbar from '../../Navbar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Managecourses = () => {
    const [allCourses, setallCourses] = useState([]);
    const [keyword, setkeyword] = useState('');
    const [newdata, setnewdata] = useState(null)
    useEffect(() => {
        axios.get(`/course/course/`).then((response) => {
            setallCourses(response.data);
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




    const deletecourse = async (cid) => {

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
                setnewdata(true)
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
            <div className="recentpurchases-outer">
                <Navbar />
                <div className='head-main'>Manage Courses</div>
                <div className='searchbar'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input placeholder='Search by username or coursename ' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
                </div>
                <div className='table'>
                    <div className='table-head'>
                        <p className='table-sno'>Sno.</p>
                        <p className='table-small'>Course Name</p>
                        <p className='table-email'>Courses Creator</p>
                        <p className='table-btn'>Delete</p>

                        <p className='table-btn'>Edit/Add</p>
                    </div>
                    <div className='table-body'>
                        {allCourses.filter((val) => {
                            if (keyword === '') {
                                return val
                            }
                            else if (val.course_name.toLowerCase().includes(keyword) || val.course_author.toLowerCase().includes(keyword)) {
                                return val
                            }
                        }).map((e, i) => {
                            return (
                                <div className='table-row' key={e._id}>
                                    <p className='table-sno'>{i + 1}</p>
                                    <p className='table-small'>{e.course_name}</p>
                                    <p className='table-email'>{e.course_author}</p>
                                    <p className='table-btn' onClick={() => deletecourse(e._id)}>Delete</p>
                                    <Link to={`/editcourse/${e._id}`} style={{ textDecoration: 'none' }}>
                                        <p className='table-btn'>Edit/Add</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div><ToastContainer /></>
    )
}

export default Managecourses