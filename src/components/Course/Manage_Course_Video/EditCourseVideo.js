import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../Navbar'
import ManageNav from './ManageNav'
import 'react-toastify/dist/ReactToastify.css';

const EditCourseVideo = () => {
    const { cid, vid } = useParams();
    console.log(cid + "  Cid", vid + "  Vid")


    const [video_position, setvideoposition] = useState('')
    const [video_title, setvideotitle] = useState('')
    const [video_type, setvideotype] = useState('')
    const [video_description, setvideodescription] = useState('')
    const [course_video, setcoursevideo] = useState('')
    const [video_path, setvideopath] = useState('')

    // const [selectedCourse, setselectedCourse] = useState();
    // const [data, setData] = useState([]);




    useEffect(() => {
        axios.get(`/course/videos/${cid}/${vid}`).then((response) => {

            setvideoposition(response.data.video_position)
            setvideotitle(response.data.video_title)
            setvideotype(response.data.video_type)
            setvideodescription(response.data.video_description)
            setvideopath(response.data.video_path)
            console.log(response.data)
            // console.log(response.data.video_title)

        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })

    }, [vid])

    // console.log(selectedCourse)
    console.log(video_title)
    console.log(video_description)
    console.log(video_type)
    console.log(video_position)




    const addvideoformdata = new FormData();
    addvideoformdata.append('video_position', video_position);
    addvideoformdata.append('video_title', video_title);
    addvideoformdata.append('video_type', video_type);
    addvideoformdata.append('video_description', video_description);
    if (course_video) { addvideoformdata.append('course_video', course_video) }


    const editVideo = async (e) => {
        e.preventDefault()
        console.log(typeof (course_image))
        axios.patch(`/course/videos/${cid}/${vid}`, addvideoformdata).then((response) => {
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


    /************************** start of  delete course section ***************************************/

    const deleteVideo = async (e) => {
        e.preventDefault()
        axios.delete(`/course/videos/${cid}/${vid}`).then((response) => {
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
    console.log(video_path)
    return (
        <>
            <div className="addvideo-outer">
                <Navbar />
                <ManageNav editcourse={false} addvideo={false} showvideos={false} courseid={cid} />
                <div className='head-main'> Edit Video </div>
                <form method='POST' encType='multipart/form-data'>
                    <video src={'/'+video_path} controls width={'100%'} controlsList="nodownload" />
                    <div className='form-inner'>
                        <div>
                            <label>Video Position</label>
                            <input name='video_position' value={video_position} onChange={(e) => { setvideoposition(e.target.value) }} placeholder='Enter Video Position' />
                        </div>

                        <div>
                            <label>Video Title</label>
                            <input name='video_title' value={video_title} onChange={(e) => { setvideotitle(e.target.value) }} placeholder='Enter Video Title' />
                        </div>
                    </div>

                    <div className='form-inner'>
                        <div>
                            <label>Video Type</label>
                            <select name='video_type' value={video_type} onChange={(e) => { setvideotype(e.target.value) }} >
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
                        <textarea name='video_description' value={video_description} onChange={(e) => { setvideodescription(e.target.value) }} placeholder='Enter Video Description' />
                    </div>


                    <div> <button onClick={editVideo} >Submit</button>

                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={deleteVideo} >Delete</button></div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default EditCourseVideo