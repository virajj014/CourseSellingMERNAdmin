import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Navbar'
import ManageNav from './ManageNav'
import '../../Recentpurchases/RecentPurchases.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowVideos = () => {
    const { cid } = useParams();
    const [selectedCourse, setselectedCourse] = useState();

    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get('/course/course/').then((response) => {
            setselectedCourse(response.data.filter(course => course._id === cid)[0])
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
    selectedCourse?.course_video.sort((a, b) => (a.video_position > b.video_position ? 1 : -1))
    // console.log(selectedCourse.course_video)

    return (
        <>
        <div className="recentpurchases-outer">
            <Navbar />
            <ManageNav editcourse={false} showvideos={true} addvideos={false} courseid={cid} />
            <div className='head-main'> Update Course Videos </div>

            <div className='searchbar'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input placeholder='Search Course Video' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
            </div>


            <div className='table'>
                <div className='table-head'>
                    <p>Sno.</p>
                    <p>Position</p>
                    <p>Video Title</p>
                    <p>Type</p>
                    <p>Edit</p>
                </div>
                <div className='table-body'>

                    {selectedCourse?.course_video?.filter((val) => {
                        if (keyword === '') {
                            return val
                        }
                        else if (val.course_video.toLowerCase().includes(keyword)) {
                            // console.log(val)

                            return val
                        }
                    }).map((e, i) => {
                        return (


                            <div className='table-row' key={e._id}>
                                <p>{i + 1}</p>
                                <p>{e.video_position}</p>
                                <p>{e.video_title}</p>
                                <p>{e.video_type}</p>
                                <Link to={`/editvideo/${cid}/${e._id}`}>
                                    <button>Edit</button>
                                </Link>
                            </div>

                        )
                    })}


                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default ShowVideos