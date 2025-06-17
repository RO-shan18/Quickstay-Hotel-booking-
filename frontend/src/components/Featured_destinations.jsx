import React from 'react'
import Title from './Title'
import Hotel_rooms from './Hotel_rooms'

import { useAppContext } from '../../context/AppContext'

const Featured_destinations = () => {

  const {rooms, navigate} = useAppContext();

  return rooms.length > 0 && (
    <div>
        <div className='my-10 md:mt-20 text-center'>
       <Title  title="Featured Hotels" desc="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"/>
       </div>


     <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:flex justify-evenly gap-5 w-full xl:px-0 px-5  xl:w-3/4 xl:mx-auto'>
        {
            rooms.map((room, index)=>{
                return (
                     <Hotel_rooms key={room?._id} room={room} index={index} />
                )
            })
        }
     </div>

     <div className='flex justify-center my-20'>
        <button onClick={()=> {navigate('/rooms'); scrollTo(0,0)}} className='text-center bg-gray-300 rounded-sm px-3 py-1 text-gray-700'>View All Hotels</button>
     </div>
      
    </div>
  )
}

export default Featured_destinations
