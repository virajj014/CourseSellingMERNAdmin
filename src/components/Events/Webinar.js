import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Eventsnav from './Eventsnav'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const Webinar = () => {
    /*************************** START OF GET ALL TRAININGS ****************************/
    const [allWebinar, setallWebinar] = useState([]);
    const [newdata, setnewdata] = useState(null);

    useEffect(() => {
        axios.get(`/webinar/webinar/`).then((response) => {
            setallWebinar(response.data);
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
    // console.log(allWebinar)
    /*************************** END OF GET ALL TRAININGS ****************************/
    /*************************** START OF ADD TRAININGS ****************************/
    const [webinar_name, setWebinarName] = useState('')
    const [webinar_image, setWebinarImage] = useState('')
    const [meeting_link, setMeetingLink] = useState('')

    const addWebinarformdata = new FormData();
    addWebinarformdata.append('webinar_name', webinar_name);
    addWebinarformdata.append('webinar_image', webinar_image);
    addWebinarformdata.append('meeting_link', meeting_link);


    const addWebinar = async (e) => {
        e.preventDefault()
        // console.log(typeof (webinar_image))
        axios.post(`/webinar/webinar`, addWebinarformdata).then((response) => {
            // console.log(response)
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
    /*************************** END OF ADD TRAININGS ****************************/


    return (
        <>
            <div className="events-outer">
                <Navbar />
                <Eventsnav webinar={true} />
                <div className='head-main'> Add new Webinar </div>
                <form >
                    <label>Webinar Name</label>
                    <input name='webinar_name' onChange={(e) => { setWebinarName(e.target.value) }} placeholder='Enter Webinar Name' />
                    <br />

                    <label>Upload Thumbnail</label>
                    <input name='webinar_image' filename='webinar_image' onChange={(e) => { setWebinarImage(e.target.files[0]) }} type='file' accept='image/png, image/jpeg, image/jpg' />
                    <br />

                    {/* <label>Date of Webinar</label>
                <input type={'date'} />
                <br />
                <label>Time of Webinar</label>
                <input type={'time'} /> 
                <br />*/}

                    <label>Reference Link</label>
                    <input name='meeting_link' onChange={(e) => { setMeetingLink(e.target.value) }} placeholder='Enter Reference Link' />
                    <button onClick={addWebinar}>Post</button>
                </form>
                <div className='head-main'> Manage Webinars</div>
                <div className='events-table'>
                    <div className='events-table-head'>
                        <p className='events-table-sno'>Sno.</p>
                        <p className='events-table-name'>Name</p>
                        <p className='events-table-img'>Poster</p>
                        {/* <p>Links</p> */}
                        <button>View</button>
                        <button>Delete</button>
                    </div>
                    <div className='events-table-data'>

                        {
                            allWebinar ?
                                allWebinar.map((e, i) => {
                                    return (
                                        <div className='events-table-data-row' key={e._id}>
                                            <p className='events-table-sno'>{i + 1}</p>
                                            <p className='events-table-name'>{e.webinar_name}</p>
                                            <div className='events-table-img'><img src={e.webinar_image} onMouseOver={(e) => { }} /></div>

                                            <a href={e.meeting_link}>
                                                <button>View</button>
                                            </a>

                                            <button onClick={(event) => {
                                                event.preventDefault()
                                                axios.delete(`/webinar/webinar/${e._id}`).then((response) => {
                                                    setnewdata(true)
                                                    toast.error(response.data, {
                                                        position: "top-center",
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        theme: 'colored'
                                                    });
                                                }).catch((error) => {
                                                    console.log(error)
                                                })
                                            }}>Delete</button>
                                        </div>
                                    )
                                })


                                :

                                <div><h1>Loading !!</h1></div>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />

        </>
    )
}

export default Webinar