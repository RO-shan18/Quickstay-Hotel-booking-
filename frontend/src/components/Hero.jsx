import React from 'react'
import { assets, cities } from "../assets/assets";

const Hero = () => {
  return (
    <div className="bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center h-screen">
      <div className='flex flex-col items-center lg:items-start w-full text-center lg:w-5/6 mx-auto'>
       <div className='flex flex-col min-h-[50vh] lg:min-h-[70vh] justify-end text-white gap-2 text-sm lg:items-start items-center'>
         <p className='bg-blue-400 rounded-4xl py-1 px-2  lg:text-md text-sm'>The Ultimate Hotel Experience</p>
         <h1 className='text-3xl md:text-4xl lg:text-5xl font-playfair font-bold'>Discover Your Perfect Getaway Destination</h1>
         <p className=' text-sm'>Unparalleled luxury and comfort await at the world's most exclusive  hotels and resorts. Start your journey today.</p>
       </div>

        <form className='bg-white text-gray-500 rounded-lg px-6 py-4 mx-5  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-4'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.locationIcon} alt="locationicon" />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-6 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
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
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calendaricon" />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="searchicon" />
                <span>Search</span>
            </button>
        </form>
        </div>
    </div>
  )
}

export default Hero
