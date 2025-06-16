import React, { useEffect, useState } from 'react'
import Title from './Title'
import Hotel_rooms from './Hotel_rooms'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const RecommendedHotels = () => {

  const {rooms, searchcities} = useAppContext();

  const [recommended, setrecommended] = useState([]);

  const filterhotel = ()=>{
     const recommendhotel = rooms.slice().filter((room)=> searchcities.includes(room.hotel.city));

     setrecommended(recommendhotel);
  }

  useEffect(()=>{
    filterhotel();
  },[rooms, searchcities])

  return recommended.length > 0 && (
    <div>
        <div className='my-20 text-center'>
       <Title  title="Recommended Hotels for You" desc="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"/>
       </div>


     <div className='flex justify-evenly gap-5 w-3/4 mx-auto'>
        {
            recommended.map((room, index)=>{
                return (
                     <Hotel_rooms key={room?._id} room={room} index={index} />
                )
            })
        }
     </div>
    </div>
  )
}

export default RecommendedHotels
