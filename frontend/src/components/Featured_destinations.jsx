import React from 'react'
import Title from './Title'
import Hotel_rooms from './Hotel_rooms'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Featured_destinations = () => {

  const {rooms} = useAppContext();

  const navigate = useNavigate();
  return rooms.length > 0 && (
    <div>
        <div className='my-20 text-center'>
       <Title  title="Featured Hotels" desc="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"/>
       </div>


     <div className='flex justify-evenly gap-5 w-3/4 mx-auto'>
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
