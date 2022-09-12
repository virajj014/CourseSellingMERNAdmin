import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import './ManageNav.css'

const ManageNav = ({ editcourse, showvideos, courseid, addvideo }) => {
    return (
        <div className="manage-nav">
            <Link to={`/editcourse/${courseid}`}> <button className={editcourse == true ? 'btn-active' : 'btn'}>Edit Course</button></Link>
            <Link to={`/addvideo/${courseid}`}> <button className={addvideo == true ? 'btn-active' : 'btn'}>Add Video</button></Link>
            <Link to={`/showvideos/${courseid}`}> <button className={showvideos == true ? 'btn-active' : 'btn'}>Show Course Videos</button></Link>
        </div>
    )
}

export default ManageNav