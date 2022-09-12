import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar'
import ManageNav from './ManageNav'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Addvideo.css'

const Addvideo = () => {
    const { cid } = useParams();

    const [video_position, setvideoposition] = useState('')
    const [video_title, setvideotitle] = useState('')
    const [video_type, setvideotype] = useState('')
    const [video_description, setvideodescription] = useState('')
    const [course_video, setcoursevideo] = useState('')


    const addvideoformdata = new FormData();
    addvideoformdata.append('video_position', video_position);
    addvideoformdata.append('video_title', video_title);
    addvideoformdata.append('video_type', video_type);
    addvideoformdata.append('video_description', video_description);
    addvideoformdata.append('course_video', course_video);

    const addNewVideo = async (e) => {
        e.preventDefault()
        console.log(typeof (course_image))
        axios.post(`/course/videos/${cid}`, addvideoformdata).then((response) => {
            if (response.status === (404)) {
                toast.error(response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
            console.log(response)

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

    return (
        <>
            <div className="addvideo-outer">
                <Navbar />
                <ManageNav editcourse={false} addvideo={true} showvideos={false} courseid={cid} />
                <div className='head-main'> Add New Video </div>
                <form method='POST' encType='multipart/form-data'>

                    <div className='form-inner'>
                        <div>
                            <label>Video Position</label>
                            <input name='video_position' onChange={(e) => { setvideoposition(e.target.value) }} placeholder='Enter Video Position' />
                        </div>

                        <div>
                            <label>Video Title</label>
                            <input name='video_title' onChange={(e) => { setvideotitle(e.target.value) }} placeholder='Enter Video Title' />
                        </div>
                    </div>

                    <div className='form-inner'>
                        <div>
                            <label>Video Type</label>
                            <select name='video_type' onChange={(e) => { setvideotype(e.target.value) }} >
                                <option>Select video type</option>
                                <option value="Paid">Paid</option>
                                <option value="Free">Free</option>
                            </select>
                        </div>

                        <div>
                            <label>Video<span className='spantag'> (* mp4 or mkv)</span></label>
                            <input type='file' filename='video_path' onChange={(e) => { setcoursevideo(e.target.files[0]) }} placeholder='Upload Video' accept='video/mp4, video/mkv' />

                        </div>
                    </div>

                    <div className='form-textarea'>
                        <label>Video Description</label>
                        <textarea name='video_description' onChange={(e) => { setvideodescription(e.target.value) }} placeholder='Enter Video Description' />
                    </div>


                    <button onClick={addNewVideo} >Submit</button>
                </form>

            </div>
            <ToastContainer />
            </>
    )
}

export default Addvideo