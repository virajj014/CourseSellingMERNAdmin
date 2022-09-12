import React, { useState } from 'react'
import './RecentPurchases.css'
const Recentpurchases = ({ data }) => {
    const [keyword, setkeyword] = useState('');
    // console.log(data[0].updatedAt.split('T'))

    data.sort((a, b) =>  a.createdAt < b.createdAt ? 1 : -1 )
    return (
        <div className="recentpurchases-outer">
            <div className='head-main'>Recent Purchases</div>
            <div className='searchbar'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input placeholder='Search by username or coursename or date' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
            </div>
            <div className='table'>
                {/* {data.map((kycdetails) => {

                })} */}
                <div className='table-head'>
                    <p className='table-sno'>Sno.</p>
                    <p className='table-small'>username</p>
                    <p className='table-small'>Course Bought</p>
                    <p className='table-small'>Amount</p>
                    <p className='table-small'>Date</p>

                </div>
                <div className='table-body'>
                    {data.filter((val) => {
                        if (keyword === '') {
                            return val
                        }
                        else if (val.client_name.toLowerCase().includes(keyword) || val.course_name.toLowerCase().includes(keyword)) {
                            return val
                        }

                    }).map((invoicedetails, i) => (
                        // console.log(kycdetails.client_name)
                        < div className='table-row' key={i}>
                            <p className='table-sno'>{i + 1}</p>
                            <p className='table-small'>{invoicedetails.client_name}</p>
                            <p className='table-small'>{invoicedetails.course_name}</p>
                            <p className='table-small'>{invoicedetails.amount}</p>
                            <p className='table-small'>{new Date(invoicedetails.createdAt).toDateString()}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div >
    )
}

export default Recentpurchases