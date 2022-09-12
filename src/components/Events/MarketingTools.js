import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Eventsnav from './Eventsnav'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const MarketingTools = () => {
    const [newdata, setnewdata] = useState(null);

    /*************************** START OF GET ALL TRAININGS ****************************/
    const [allmarketingtool, setAllmarketingtool] = useState([]);
    useEffect(() => {
        axios.get(`/marketingtool/marketingtool/`).then((response) => {
            setAllmarketingtool(response.data);
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
    // console.log(allmarketingtool)
    /*************************** END OF GET ALL TRAININGS ****************************/
    /*************************** START OF ADD TRAININGS ****************************/
    const [marketingtool_name, setMarketingToolName] = useState('')
    const [marketingtool_image, setMarketingToolImage] = useState('')
    const [youtube_link, setYoutubeLink] = useState('')

    const addMarketingToolformdata = new FormData();
    addMarketingToolformdata.append('marketingtool_name', marketingtool_name);
    addMarketingToolformdata.append('marketingtool_image', marketingtool_image);
    addMarketingToolformdata.append('youtube_link', youtube_link);


    const addMarketingTools = async (e) => {
        e.preventDefault()
        axios.post(`/marketingtool/marketingtool`, addMarketingToolformdata).then((response) => {
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
            <div className="events-outer">
                <Navbar />
                <Eventsnav marketingtools={true} />
                <div className='head-main'> Add new Marketing Tool </div>
                <form>
                    <label>Tool Name</label>
                    <input name='marketingtool_name' onChange={(e) => { setMarketingToolName(e.target.value) }} placeholder='Enter Marketing Tool Name' />
                    <br />
                    <label>Upload Poster</label>
                    <input name='marketingtool_image' filename='marketingtool_image' onChange={(e) => { setMarketingToolImage(e.target.files[0]) }} type='file' accept='image/png, image/jpeg, image/jpg' />
                    <br />
                    <label>Reference Link</label>
                    <input name='youtube_link' onChange={(e) => { setYoutubeLink(e.target.value) }} placeholder='Enter Reference Link' />
                    <button onClick={addMarketingTools}>Post</button>
                </form>
                <div className='head-main'> Manage Marketing Tools </div>
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


                            allmarketingtool ?
                                allmarketingtool.map((e, i) => {
                                    return (
                                        <div className='events-table-data-row' key={e._id}>
                                            <p className='events-table-sno'>{i + 1}</p>
                                            <p className='events-table-name'>{e.marketingtool_name}</p>
                                            <div className='events-table-img'><img src={e.marketingtool_image} width='100px' onMouseOver={(e) => { }} />
                                            </div>
                                            <a href={e.youtube_link}>
                                                <button>View</button>
                                            </a>

                                            <button onClick={(event) => {
                                                event.preventDefault()
                                                axios.delete(`/marketingtool/marketingtool/${e._id}`).then((response) => {
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

export default MarketingTools