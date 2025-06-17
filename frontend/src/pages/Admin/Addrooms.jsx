import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../../context/AppContext';

const Addrooms = () => {

  const {getToken, axios, toast} = useAppContext();

  const [loading , setloading] = useState(false);

  const [images, setimages] = useState({
    1:null,
    2:null,
    3:null,
    4:null
  });

  const [inputs, setinputs] = useState({
    roomType : "",
    pricePerNight : 0,
    amenities : {
      "Free WiFi" : false,
      "Room Service" : false,
      "Pool Access" : false,
      "Free Breakfast" : false,
      "Mountain View" : false,
    }
  })

  //adding rooms for particular hotel
  const submithandler = async(e)=>{
    e.preventDefault();

    if(!inputs.roomType || !inputs.pricePerNight || !inputs.amenities || !Object.values(images).some(image => image)){
       toast.error("Please fill in all the details")
    }

    setloading(true);

    try{

        //Store inside form
        let formdata = new FormData();

        formdata.append("roomType", inputs.roomType);
        formdata.append("pricePerNight", inputs.pricePerNight);

        //get selected aminity
        const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);

        formdata.append("amenities", JSON.stringify(amenities));

        //get images which is available
        Object.keys(images).filter(key => images[key] && formdata.append("image", images[key]));

        const {data} = await axios.post('/api/rooms/add-room', formdata, {headers : {
          Authorization : `Bearer ${await getToken()}`
        }});

        console.log(data)

        if(data.success){
           toast.success(data.message);
           
           //empty the fields
           setinputs({
             roomType : "",
             pricePerNight : 0,
             amenities : {
                "Free WiFi" : false,
                "Room Service" : false,
                "Pool Access" : false,
                "Free Breakfast" : false,
                "Mountain View" : false,
              }
           })
           
           setimages({1:null, 2:null, 3:null, 4:null})
        }else{
          
          toast.error(data.message);
        }

    }catch(error){
       toast.error(error.message);
    }

    setloading(false)
  }

  return (
    <div className='mx-10 my-5'>
       <Title font="Outlook" title="Add Room" desc="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience." />

       <form onSubmit={submithandler} className='flex flex-col gap-8 my-5'>
         {/* images */}
         <div className='flex flex-col gap-2'>
          <p className='text-xl text-gray-700'>Images</p>
           <div className='flex flex-wrap gap-5'>
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

        <div className='flex sm:flex-row flex-col gap-5'>
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
          <input className='px-4 py-2 border-2 border-gray-300 text-gray-700' type="Number" value={inputs.pricePerNight} onChange={(e)=> setinputs({...inputs,  pricePerNight : e.target.value})}/>
         </div>
        </div>

         {/* aminites */}
         <div className='flex flex-col gap-2'>
          <p className='text-xl text-gray-700'>Amenities</p>

          <div className='flex flex-col gap-2'>
         {
            Object.keys(inputs.amenities).map((aminity, index)=>{
              return(
                 <label key={index} htmlFor='index' className='flex gap-2 '>
                   <input type="checkbox" checked={inputs.amenities[aminity]} value={inputs.amenities[aminity] } onChange={(e)=>setinputs( {...inputs, amenities:{...inputs.amenities, [aminity] : !inputs.amenities[aminity]}})}/>
                   <p className='text-gray-700 '>{aminity}</p>
                 </label>
              )
             })
         }
         </div>
         </div>

         {/* button */}
         <button className='bg-blue-500 px-5 py-2 w-3/4 sm:w-2/4 md:w-1/4 text-white text-xl'>{loading ? " Adding...." : "Add room"}</button>
       </form>
    </div>
  )
}

export default Addrooms
