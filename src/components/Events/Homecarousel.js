import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Eventsnav from './Eventsnav'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Homecarousel = () => {
    // Getting old data 
    const [newdata, setnewdata] = useState(null);

    const [allcarouseldata, setAllcarouseldata] = useState([]);
    useEffect(() => {
        axios.get(`/carouseldata/carouseldata`).then((response) => {
            setAllcarouseldata(response.data);
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


    // New data
    const [carouselcard_name, setCarouselcardname] = useState('')
    const [carouselcard_img, setCarouselcard_img] = useState('')
    const [youtube_link, setYoutubeLink] = useState('')


    const addCarouselformdata = new FormData();
    addCarouselformdata.append('carouselcard_name', carouselcard_name);
    addCarouselformdata.append('carouselcard_img', carouselcard_img);
    addCarouselformdata.append('youtube_link', youtube_link);


    const addtoCarousel = async (e) => {
        e.preventDefault()
        axios.post(`/carouseldata/carouseldata`, addCarouselformdata).then((response) => {
            if (response.status === (400)) {
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
                setnewdata(true)

            }

        }).catch((e) => {
            console.log(e.message)
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




    // console.log(allcarouseldata)

    return (
        <>
            <div className="events-outer">
                <Navbar />
                <Eventsnav homecarousel={true} />
                <div className='head-main'> Add new Carousel card </div>
                <form>
                    <label>Card Name</label>
                    <input name='carouselcard_name' onChange={(e) => { setCarouselcardname(e.target.value) }} placeholder='Enter Card Name' />
                    <br />
                    <label>Upload Poster</label>
                    <input name='carouselcard_img' filename='carouselcard_img' onChange={(e) => { setCarouselcard_img(e.target.files[0]) }} type='file' accept='image/png, image/jpeg, image/jpg' />
                    <br />
                    <label>Reference Link</label>
                    <input name='youtube_link' onChange={(e) => { setYoutubeLink(e.target.value) }} placeholder='Enter Reference Link' />
                    <button onClick={addtoCarousel}>Post</button>
                </form>
                <div className='head-main'> Manage Carousel Data </div>
                <div className='events-table'>
                    <div className='events-table-head'>
                        <p className='events-table-sno'>Sno.</p>
                        <p className='events-table-name'>Name</p>
                        <p className='events-table-img'>Poster</p>
                        <button>View</button>
                        {/* <p>Links</p> */}
                        <button>Delete</button>
                    </div>
                    <div className='events-table-data'>

                        {

                            allcarouseldata ?
                                allcarouseldata.map((e, i) => {
                                    return (
                                        <div className='events-table-data-row' key={e._id}>
                                            <p className='events-table-sno'>{i + 1}</p>
                                            <p className='events-table-name'>{e.carouselcard_name}</p>
                                            <div className='events-table-img'><img src={e.carouselcard_img} width='100px' onMouseOver={(e) => { }} />
                                            </div>
                                            <a href={e.youtube_link}>
                                                <button>View</button>
                                            </a>
                                            <button onClick={(event) => {

                                                event.preventDefault()
                                                axios.delete(`/carouseldata/carouseldata/${e._id}`).then((response) => {
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
                                            }} >Delete</button>
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

export default Homecarousel