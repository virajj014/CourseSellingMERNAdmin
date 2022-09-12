import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Eventsnav from './Eventsnav'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './Table.css'


const Offer = () => {
    const [newdata, setnewdata] = useState(null);

    /*************************** START OF GET ALL TRAININGS ****************************/
    const [allOffers, setAllOffers] = useState([]);
    useEffect(() => {
        axios.get(`/offer/offer/`).then((response) => {
            setAllOffers(response.data);
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
    // console.log(allOffers)
    /*************************** END OF GET ALL TRAININGS ****************************/
    /*************************** START OF ADD TRAININGS ****************************/
    const [offer_name, setofferName] = useState('')
    const [offer_image, setofferImage] = useState('')
    const [youtube_link, setYoutubeLink] = useState('')

    const addOfferformdata = new FormData();
    addOfferformdata.append('offer_name', offer_name);
    addOfferformdata.append('offer_image', offer_image);
    addOfferformdata.append('youtube_link', youtube_link);


    const addOffers = async (e) => {
        e.preventDefault()
        //   console.log(typeof (training_image))
        axios.post(`/offer/offer`, addOfferformdata).then((response) => {
            if (response.status === (400)) {
                toast.error(response.data + '💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
            //   console.log(response)

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
                <Eventsnav offer={true} />
                <div className='head-main'> Add new Offer </div>
                <form>
                    <label>Offer Name</label>
                    <input name='offer_name' onChange={(e) => { setofferName(e.target.value) }} placeholder='Enter Offer Name' />
                    <br />
                    <label>Upload Poster</label>
                    <input name='offer_image' filename='offer_image' onChange={(e) => { setofferImage(e.target.files[0]) }} type='file' />
                    <br />
                    {/* <label>Offer Valid till Date</label>
                <input type={'date'} />
                <br />
                <label>Offer Valid till Time</label>
                <input type={'time'} />
                <br /> */}
                    <label>Reference Link</label>
                    <input name='youtube_link' onChange={(e) => { setYoutubeLink(e.target.value) }} placeholder='Enter Reference Link' />
                    <button onClick={addOffers}>Post</button>
                </form>
                <div className='head-main'> Manage Offers </div>
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
                            allOffers ?

                                allOffers.map((e, i) => {

                                    // console.log(props.offers)
                                    return (
                                        <div className='events-table-data-row' key={e._id}>
                                            <p className='events-table-sno'>{i + 1}</p>
                                            <p className='events-table-name'>{e.offer_name}</p>
                                            <div className='events-table-img'> <img src={e.offer_image} width='100px' onMouseOver={(e) => { }} /></div>
                                            <a href={e.youtube_link}>
                                                <button>View</button>
                                            </a>
                                            <button onClick={(event) => {
                                                event.preventDefault()
                                                axios.delete(`/offer/offer/${e._id}`).then((response) => {
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

export default Offer