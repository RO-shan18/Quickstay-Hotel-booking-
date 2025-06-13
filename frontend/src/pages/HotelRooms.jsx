import React, { useState } from "react";
import Title from "../components/Title";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import Rating from "../components/Rating";
import { useNavigate } from "react-router-dom";

const Checkbox = ({label, selected=false, onchange = ()=> {}})=>{
    return(
        <label className=" flex text-gray-700 gap-3">
        <input type="checkbox" checked={selected} onChange={(e)=> onchange(e.target.checked, label)} />
        <span>{label}</span>
        </label>
    )
}

const Radiobutton = ({label, selected=false, onchange = ()=> {}})=>{
    return(
        <label className="flex text-gray-700 gap-3">
        <input type="radio" checked={selected} onChange={(e)=> onchange(label)} />
        <span>{label}</span>
        </label>
    )
}

const HotelRooms = () => {

  const[showfilters, setshowfilters] = useState(false);

  const navigate = useNavigate();

  const roomtype = [
    "Single Bed",
    "Double Bed",
    "Luxury rooms",
    "Family Suite"
  ]

  const Pricerange = [
    "2500 to 3000",
    "5000 to 8000",
    "8000 to 15000"
  ]

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ]

  return (
    <div className="mt-30 w-5/6 mx-auto ">
      <Title
        title="Hotel Rooms"
        desc="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
      />

      <div className="flex ">
        {/* Hotel Rooms */}
        <div className="flex flex-col gap-12 mt-10">
            {  
                roomsDummyData.slice(0,4).map((data, index)=>{
                    return(
                        <div key={data._id} className="flex gap-6 ">
                            <img onClick={()=> navigate(`${data._id}`)} src={data.images[0]} className="rounded-xl w-2/6"  alt="roomimage" />

                            <div className="flex flex-col gap-5">
                                <p className="text-gray-600 ">{data.hotel.address}</p>
                                <h1 onClick={()=> navigate(`${data._id}`)} className="text-3xl text-gray-800 font-playfair">{data.hotel.name}</h1>

                                {/* Rating */}
                                <div className="flex gap-9">
                                    <Rating/>
                                    <span>200+ reviews</span>
                                </div>

                                {/* LOcation */}
                                <div className="flex gap-4">
                                    <img src={assets.locationIcon} alt="locationimage"/>
                                    <span className="text-gray-600">{data.hotel.address}</span>
                                </div>

                                {/* aminiies */}
                                <div className="flex gap-4">
                                    {
                                        data.amenities.map((aminity, index)=>{
                                            return(
                                                <div key={index} className="flex  bg-gray-200 px-2 py-1 rounded-sm gap-2">
                                                    <img src={facilityIcons[aminity]} alt="aminityimage"/>
                                                    <p>{aminity}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {/* charge per day */}
                                <p className="text-2xl text-gray-700">{data.pricePerNight}/night</p>
                            </div>
                        </div>
                    )
                })
            }

            
        </div>
        {/* filters */}
        <div className="w-[25vw] border border-gray-400 flex flex-col gap-3 h-fit pb-6">
            <div className="flex justify-between border-b border-gray-400">
                <p className="px-3 py-2 text-xl">FILTERS</p>
                <div className="flex items-center pr-3 text-md text-gray-400">
                    <span className="lg:hidden" onClick={()=> setshowfilters(!showfilters)}>{showfilters ? "SHOW" : "HIDE"}</span>
                    <span className=" lg:block hidden">CLEAR</span>
                </div>
            </div>
            <div className={`${showfilters && "hidden"} transition-all duration-500`}>
            {/* roomtype filter */}
            <div className="flex flex-col text-gray-400 px-4">
              <h1 className=" text-black py-2 text-lg">Popular filters</h1>
              <div className="flex flex-col gap-1">
               {
                roomtype.map((type, index)=>{
                    return ( <Checkbox key={index} label={type} />)
                })
               }
              </div>
            </div>
            {/* price rangle filter */}
            <div className="flex flex-col text-gray-400 px-4 ">
              <h1 className=" text-black py-2 text-lg">Price</h1>
              <div className="flex flex-col gap-1">
               {
                Pricerange.map((type, index)=>{
                    return  <Checkbox key={index} label={`$ ${type}`} />
                })
               }
               </div>
            </div>
            {/* sorting filter */}
            <div className="flex flex-col text-gray-400 px-4">
              <h1 className=" text-black py-2 text-lg">Sort by</h1>
              <div className="flex flex-col gap-1">
               {
                sortOptions.map((type, index)=>{
                    return  <Radiobutton key={index} label={type} />
                })
               }
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HotelRooms;
