import React from 'react'
import { Link } from 'react-router-dom'


const Eventsnav = ({ training, marketingtools, webinar, offer, homecarousel }) => {
    return (
        <div className="manage-nav">
            <Link to={`/training`}> <button className={training == true ? 'btn-active' : 'btn'}>Training</button></Link>
            <Link to={`/marketingtools`}> <button className={marketingtools == true ? 'btn-active' : 'btn'}>Marketing Tools</button></Link>
            <Link to={`/webinars`}> <button className={webinar == true ? 'btn-active' : 'btn'}>Webinar</button></Link>
            <Link to={`/offer`}> <button className={offer == true ? 'btn-active' : 'btn'}>Offer</button></Link>
            <Link to={`/homecarousel`}> <button className={homecarousel == true ? 'btn-active' : 'btn'}>Home Carousel</button></Link>
        </div>
    )
}

export default Eventsnav