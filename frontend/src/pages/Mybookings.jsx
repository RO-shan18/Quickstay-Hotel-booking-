import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useEffect } from 'react'

const Mybookings = () => {

    const {axios, toast, getToken, user} = useAppContext();

    const [bookings, setbookings] = useState([]);

    const getuserbookings = async()=>{
        try{

            const {data} = await axios.get('/api/booking/user-booking-detail', {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          })

            if(data.success){
                setbookings(data.message);
            }else{
                toast.error("No bookings available");
            }

        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user){
            getuserbookings();
        }
    },[user])
  return (
    <div className='w-5/6 mx-auto my-30 flex flex-col gap-6'>
        <div>
            <Title title="My Bookings" desc="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"></Title>
        </div>

        <div className='grid grid-cols-[3fr_2fr_1fr] gap-5'>
            <div>Hotels</div>
            <div>Date & Timings</div>
            <div>Payment</div>
        </div>
        <hr className='h-[0.3px] border-b border-gray-200'/>

        <div className='flex flex-col gap-5'>
            {
                bookings.map((data)=>{
                    return <div className='grid grid-cols-[3fr_2fr_1fr] gap-5 ' key={data._id}> 
                    {/* first column */}
                    <div className='flex gap-4'>
                        {/* image */}
                       <img className='w-2/4 rounded-lg' src={data.room.image[0]} />

                        {/* hotel name */}
                      <div className='flex flex-col gap-3 justify-center'>
                        <div className='flex text-gray-800 items-center gap-1'>
                            <h1 className='font-playfair text-3xl '>{data.hotel.name}</h1>
                            <p className='text-sm'>({data.room.roomType})</p>
                        </div>   

                        {/* location of hotel */}
                        <div className='flex text-gray-500 gap-1 text-md'>
                            <img src={assets.locationIcon} alt="locationimage"/>
                            <p>{data.hotel.address}</p>
                        </div>

                        {/* No. of guests */}
                        <div className='flex text-gray-500 gap-1  text-md'>
                            <img src={assets.guestsIcon} alt="guesticon" />
                            <p>Guests: {data.guests}</p>
                        </div>

                        {/* Price of a room */}
                        <p className='text-gray-800 text-xl'>Total : ${data.room.pricePerNight}</p>
                        </div>
                    </div>

                    {/* Second column */}
                    <div className='flex gap-7 items-center'>
                        <div className='flex flex-col items-start'>
                            <p className='text-gray-800 '>Check-In:</p>
                            <p className='text-gray-500 text-md'>{new Date(data.checkInDate).toLocaleDateString()}</p>
                        </div>
                        <div className='flex flex-col items-start'>
                            <p className='flex flex-col items-start'>Check-Out:</p>
                            <p className='text-gray-500 text-md'>{new Date(data.checkOutDate).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* third column */}
                    <div className='flex flex-col justify-center'>
                        <div className='flex gap-2 items-center py-2'>
                           <div className={`w-2 h-2 rounded-4xl ${data.isPaid ? "bg-green-500" : "bg-red-600"} `}></div>
                           <p className={`${data.isPaid ? "text-green-500" : "text-red-600"} `}>{data.isPaid ? "Paid" : "Unpaid"}</p>

                        </div>
                        <button className={` ${data.isPaid && "hidden"} w-3/4 py-1 rounded-2xl border border-gray-400 `}>Pay Now</button>
                    </div>
                    </div>
                })
            }
        </div>
        </div>
  )
}

export default Mybookings
