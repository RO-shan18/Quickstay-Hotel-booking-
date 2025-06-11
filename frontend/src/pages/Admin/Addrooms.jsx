import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets';

const Addrooms = () => {

  const [images, setimages] = useState({
    1:null,
    2:null,
    3:null,
    4:null
  });

  const [inputs, setinputs] = useState({
    roomType : "",
    pricePerNight : 0,
    aminities : {
      "Free WiFi" : false,
      "Room Service" : false,
      "Pool Access" : false,
      "Free Breakfast" : false,
      "Mountain View" : false,
    }
  })


  return (
    <div className='mx-10 my-5'>
       <Title font="Outlook" title="Add Room" desc="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience." />

       
       <form className='flex flex-col gap-8 my-5'>
         {/* images */}
         <div className='flex flex-col gap-2'>
          <p className='text-xl text-gray-700'>Images</p>
           <div className='flex gap-5'>
            {
              Object.keys(images).map((key)=>{
                return(
                   <label key={key} htmlFor={`images${key}`} >
                      <img src={images[key] ? URL.createObjectURL(images[key]): assets.uploadArea}  alt="roomimage"/>
                      <input type="file" accept="image/*" id={`images${key}`} hidden onChange={(e) => setimages({...images, [key]:e.target.files[0]})}/>
                   </label>
                 )
              })
            }
            </div>
         </div>

        <div className='flex gap-5'>
         {/* Room types */}
         <div className='flex flex-col gap-2'>
          <p className='text-xl text-gray-700'>Room Type</p>
           <select className='px-4 py-2 border-2 border-gray-300 text-gray-700' placeholder="Select room Type" value={inputs.roomType} onChange={(e)=> setinputs({...inputs,  roomType : e.target.value})}>
              <option >Single Bed</option>
              <option >Double Bed</option>
              <option >Luxury rooms</option>
              <option>Family Suite</option>
           </select>
         </div>

         {/* price per night */}
         <div className='flex flex-col gap-2'>
          <p className='text-xl text-gray-700'> Price perNight</p>
          <input className='px-4 py-2 border-2 border-gray-300 text-gray-700' type="Number" value={inputs.pricePerNight} onChange={(e)=> setimages(e.target.value)}/>
         </div>
        </div>

         {/* aminites */}
         <div className='flex flex-col gap-2'>
          <p className='text-xl text-gray-700'>Aminities</p>

          <div className='flex flex-col gap-2'>
         {
            Object.keys(inputs.aminities).map((aminity, index)=>{
              return(
                 <label htmlFor='index' className='flex gap-2 '>
                   <input type="checkbox" checked={inputs.aminities[aminity]} value={inputs.aminities[aminity] } onChange={(e)=>setinputs( {...inputs, aminities:{...inputs.aminities, [aminity] : !inputs.aminities[aminity]}})}/>
                   <p className='text-gray-700 '>{aminity}</p>
                 </label>
              )
             })
         }
         </div>
         </div>

         {/* button */}
         <button className='bg-blue-500 px-5 py-2 w-1/4 text-white text-xl'>Add room</button>
       </form>
    </div>
  )
}

export default Addrooms
