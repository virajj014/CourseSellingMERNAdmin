import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Eventsnav from './Eventsnav'
import './Eventsform.css'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const Training = () => {
    // call the previous training data here
    /*************************** START OF GET ALL TRAININGS ****************************/
    const [allTrainings, setallTrainings] = useState([]);
    const [newdata, setnewdata] = useState(null);

    useEffect(() => {
        axios.get(`/training/training/`).then((response) => {
            setallTrainings(response.data);
            // console.log('useeffectcalled')
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
    // console.log(allTrainings)
    /*************************** END OF GET ALL TRAININGS ****************************/

    /*************************** START OF ADD TRAININGS ****************************/
    const [traning_name, setTraningName] = useState('')
    const [training_image, setTrainingImage] = useState('')
    const [youtube_link, setYoutubeLink] = useState('')

    const addTrainingformdata = new FormData();
    addTrainingformdata.append('traning_name', traning_name);
    addTrainingformdata.append('training_image', training_image);
    addTrainingformdata.append('youtube_link', youtube_link);


    const addTrainings = async (e) => {
        e.preventDefault()
        // console.log(typeof (training_image))
        axios.post(`/training/training`, addTrainingformdata).then((response) => {
            if (response.status === (400)) {
                toast.error(response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
            // console.log(response)

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
            <div className='events-outer'>
                <Navbar />
                <Eventsnav training={true} />
                <div className='head-main'> Add new Training </div>
                <form>
                    <label>Training Name</label>
                    <input name='traning_name' onChange={(e) => { setTraningName(e.target.value) }} placeholder='Enter Training Name' />
                    <br />
                    <label>Upload Poster</label>
                    <input name='training_image' filename='training_image' onChange={(e) => { setTrainingImage(e.target.files[0]) }} type='file' accept='image/png, image/jpeg, image/jpg' />
                    <br />
                    <label>Reference Link</label>
                    <input name='youtube_link' onChange={(e) => { setYoutubeLink(e.target.value) }} placeholder='Enter Reference Link' />
                    <button onClick={addTrainings}>Post</button>
                </form>
                <div className='head-main'> Manage Trainings </div>
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
                            allTrainings ?
                                allTrainings.map((e, i) => {
                                    return (
                                        <div className='events-table-data-row' key={e._id}>
                                            <p className='events-table-sno'>{i + 1}</p>
                                            <p className='events-table-name'>{e.traning_name}</p>
                                            <div className='events-table-img'><img src={e.training_image} width='100px' onMouseOver={(e) => { }} /></div>
                                            <a href={e.youtube_link}>
                                                <button>View</button>
                                            </a>
                                            <button onClick={(event) => {
                                                event.preventDefault()
                                                axios.delete(`/training/training/${e._id}`).then((response) => {
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

export default Training