import React, { useEffect, useState } from 'react'
import Title from './Title'
import Hotel_rooms from './Hotel_rooms'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const RecommendedHotels = () => {

  const {rooms, searchcities} = useAppContext();

  const [recommended, setrecommended] = useState([]);

  const filterhotel = ()=>{
     const recommendhotel = rooms.slice().filter((room)=> searchcities.includes(room?.hotel?.city));

     setrecommended(recommendhotel);
  }

  useEffect(()=>{
    filterhotel();
  },[rooms, searchcities])

  return recommended.length > 0 && (
    <div>
        <div className='my-10 md:my-20 text-center'>
       <Title  title="Recommended Hotels for You" desc="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"/>
       </div>


     <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:flex justify-evenly gap-5 w-full xl:px-0 px-5  xl:w-3/4 xl:mx-auto'>
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
