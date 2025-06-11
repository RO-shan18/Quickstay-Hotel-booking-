import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {

   const [dashboarddata, setdashboarddata] = useState(dashboardDummyData)

  return (
    <div className='m-7 flex flex-col gap-12'>
      <div >
      <Title font="Outlook" title="Dashboard" desc="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations." />
      </div>

      <div className='flex gap-8'>
        {/* Total Bookings */}
        <div className='flex gap-3 bg-blue-50 justify-start px-6 py-2'>
           <img className='w-10' src={assets.totalBookingIcon} alt="totalbookingicon" />

            <div className='flex flex-col '>
            <p className='text-blue-600 font-semibol'>Total Bookings</p>
            <p className='text-gray-800 text-sm'>{dashboarddata.totalBookings}</p>
           </div>
        </div>

        {/* Total Revenue */}
        <div className='flex gap-3 bg-blue-50 justify-start px-6 py-2'>
          <img className='w-10' src={assets.totalRevenueIcon} alt="totalbookingicon" />

          <div className='flex flex-col '> 
          <p className='text-blue-600 font-semibol'>Total Revenue</p>
          <p className='text-gray-800 text-sm'>{dashboarddata.totalRevenue}</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <p className='text-gray-700 text-xl'>Recent Bookings</p>

        <table className='border-2 border-gray-300 '>
          <thead className='text-gray-800 text-bold text-xl '>
            <tr>
            <th className="px-6 py-3 border border-gray-300 bg-gray-100 ">User Name</th>
            <th className="px-6 py-3 border border-gray-300 bg-gray-100">Room Name</th>
            <th className="px-6 py-3 border border-gray-300 bg-gray-100">Total Amount</th>
            <th className="px-6 py-3 border border-gray-300 bg-gray-100">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {
              dashboarddata.bookings.map((data)=>{
                return(
                    <tr key={data._id}>               
                      <td className="px-6 py-3 border border-gray-300 text-gray-500">{data.user.username}</td> 
                      <td className="px-6 py-3 border border-gray-300 text-gray-500">{data.room.roomType}</td> 
                      <td className="px-6 py-3 border border-gray-300 text-gray-500">{data.totalPrice}</td> 
                      <td className={`${data.isPaid ?  " bg-green-300 text-green-700" : "bg-amber-300 text-orange-500" } px-6 py-3 border border-gray-300 `}>{data.isPaid ? "Completed" : "Pending"}</td> 
                  </tr>   
                )
              })
            }
         </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
