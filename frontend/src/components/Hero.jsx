import React, { useState } from 'react'
import { assets, cities } from "../assets/assets";
import { useAppContext } from '../../context/AppContext';

const Hero = () => {

  const {axios, navigate, toast, getToken, setsearchcities} = useAppContext();

  const [destination, setdestination] = useState('');

  const searchcity = async(event)=>{
    event.preventDefault();
    navigate(`/rooms?destination=${destination}`)
    try{    
        await axios.post('/api/user/search-recent-cities', {recentSearchCities: destination}, {headers : {
          Authorization : `Bearer ${await getToken()}`
        }})

        setsearchcities((prevsearchcities)=>{
            const updatedcities = [...prevsearchcities, destination];

            if(updatedcities.length > 3){
                updatedcities.shift();
            }

            return updatedcities;
        })
       
    }catch(error){
        toast.error(`No rooms or hotels available in ${destination}`)
    }
  }

  return (
    <div className="bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center h-[100vh]">
      <div className='flex flex-col items-center lg:items-start w-full text-center lg:w-5/6 mx-auto'>
       <div className='flex flex-col min-h-[40vh] md:min-h-[50vh] lg:min-h-[70vh] justify-end text-white gap-2 text-sm lg:items-start items-center'>
         <p className='bg-blue-400 rounded-4xl py-1 px-2  lg:text-md text-sm'>The Ultimate Hotel Experience</p>
         <h1 className='text-3xl md:text-4xl lg:text-5xl font-playfair font-bold'>Discover Your Perfect Getaway Destination</h1>
         <p className=' text-sm'>Unparalleled luxury and comfort await at the world's most exclusive  hotels and resorts. Start your journey today.</p>
       </div>

        <form onSubmit={searchcity} className='bg-white text-gray-500 rounded-lg px-6 py-4 mx-5  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-4'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.locationIcon} alt="locationicon" />
                    <label className="text-sm md:text-lg" htmlFor="destinationInput">Destination</label>
                </div>
                <input onChange={(e)=> setdestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-6 md:py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id="destinations">
                    {
                     cities.map((city, index)=>{
                        return <option value={city} key={index} />
                    })
                    }
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calendaricon" />
                    <label className="text-sm md:text-lg" htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 md:py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calendaricon" />
                    <label className="text-sm md:text-lg" htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 md:py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label className="text-sm md:text-lg" htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-1.5 md:py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="searchicon" />
                <span className="text-sm md:text-lg">Search</span>
            </button>
        </form>
        </div>
    </div>
  )
}

export default Hero
