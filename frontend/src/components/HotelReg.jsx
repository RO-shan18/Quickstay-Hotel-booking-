import React from 'react'
import { assets, cities } from '../assets/assets'

const HotelReg = () => {
  return (
    <div className='absolute flex z-100 gap-5 rounded-xl bg-white w-4/6 mx-auto top-10 bottom-0 h-fit right-0 left-0 backdrop-blur-lg'>
       <img src={assets.regImage} className='w-3/6 ' alt="regimage"/>

       <form className='w-full flex flex-col gap-6 items-end '>
        <img className='w-4 m-3.5' src={assets.closeIcon} alt="closeicon" />
        <div className='w-full px-5 flex flex-col items-center gap-5'>
         <div>
            <h1 className='text-3xl font-playfair'>Registration Hotel</h1>
         </div>

        <div className='flex flex-col gap-4 w-full'>
         {/* Hotel name */}
         <div className='flex flex-col gap-2'>
           <label className='text-gray-800' htmlFor='name'>Hotel name</label>
           <input className='text-gray-500 px-3 py-2' type="text" placeholder="Enter Hotel Name" />
         </div>
         {/* Hotel name */}
         <div className='flex flex-col gap-2'>
           <label className='text-gray-800' htmlFor='name'>Phone</label>
           <input className='text-gray-500 px-3 py-2' type="Number" placeholder="Enter Hotel Name" />
         </div>
         {/* Hotel name */}
         <div className='flex flex-col gap-2'>
           <label className='text-gray-800' htmlFor='name'>Address</label>
           <input className='text-gray-500 px-3 py-2' type="text" placeholder="Enter Hotel Name" />
         </div>
         {/* Hotel name */}
         <div className='flex flex-col gap-2'>
           <label className='text-gray-800' htmlFor='name'>City</label>
           <select className='text-gray-500 px-3 py-2'>
                {
                    cities.map((city, index)=>{
                        return <option  key={index} value={city}>{city}</option>
                    })
                }
           </select>
         </div>
         {/* Hotel name */}
         <div className='flex flex-col gap-2 bg-blue-500 py-3 text-white rounded-lg'>
           <button type="submit" value="Register">Register</button>
         </div>

        </div>
        </div>
       </form>
    </div>
  )
}

export default HotelReg
