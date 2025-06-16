import React, { useMemo, useState } from "react";
import Title from "../components/Title";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import Rating from "../components/Rating";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Checkbox = ({label, selected=false, onChange = ()=> {}})=>{
    return(
        <label className=" flex text-gray-700 gap-3">
        <input type="checkbox" checked={selected} onChange={(e)=> onChange(e.target.checked, label)} />
        <span>{label}</span>
        </label>
    )
}

const Radiobutton = ({label, selected=false, onChange = ()=> {}})=>{
    return(
        <label className="flex text-gray-700 gap-3">
        <input type="radio" checked={selected} onChange={(e)=> onChange(label)} />
        <span>{label}</span>
        </label>
    )
}

const HotelRooms = () => {

  const[searchparams, setsearchparams] = useSearchParams()
  const {rooms, navigate, currency} = useAppContext();

  const[showfilters, setshowfilters] = useState(false);

  const [selectedfilters, setselectedfilters] = useState({
    roomType : [],
    priceRange : [],
  })

  const [sortoptions, setsortoptions] = useState('');

  const roomtype = [
    "Single Bed",
    "Double Bed",
    "Luxury rooms",
    "Family Suite"
  ]

  const Pricerange = [
    "99 to 499",
    "599 to 1199",
    "1299 to 1699"
  ]

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ]


  //Handle changes for filters and sorting
  const handlefilterChange = (checked, value, type)=>{
     setselectedfilters((prevfilters)=>{
        const updatedfilters = {...prevfilters};

        if(checked){
            updatedfilters[type].push(value);
        }else{
            updatedfilters[type] = updatedfilters[type].filter(item => item !== value);
        }

        return updatedfilters;
     })
  }

   const handlesortchange = (sortOption)=>{
    setsortoptions(sortOption);
   }

   //functions to check if a room matces the selected room types
   const matchesRoomType = (room) =>{
      return selectedfilters.roomType.length === 0 || selectedfilters.roomType.includes(room.roomType);
    }

    //function to check if a room matches the selected price range
    const matchesPriceRange = (room)=>{
        return selectedfilters.priceRange.length === 0 || selectedfilters.priceRange.some(range =>{
            const [min, max] = range.split(' to ').map(Number);

            return room.pricePerNight >=  min && room.pricePerNight <= max
        })
    }

    //function to sort rooms based on the selected sort option
    const sortRooms = (a, b)=>{
        if(sortoptions === 'Price Low to High'){
            return a.pricePerNight - b.pricePerNight
        }
         
        if(sortoptions === 'Price High to Low'){
            return b.pricePerNight - a.pricePerNight
        }

        if(sortoptions === 'Newest First'){
            return new Date(b.createdAt) -  new Date(a.createdAt)
        }

        return 0;
    }

    //filter Destination
    const filterDestination = (room)=>{
        const destination = searchparams.get('destination');
        
        if(!destination) return true;
        return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
    }

    //filter and sort rooms based on the selected destination
    const filteredRooms = useMemo(()=>{
        return rooms.filter(room => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms);
    },[rooms, selectedfilters, sortoptions, searchparams]);

    //clear all filters
    const clearFilters = ()=>{
        setselectedfilters({
            roomType:[],
            priceRange:[],
        });

        setsortoptions('');
        setsearchparams({});
    }


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
                filteredRooms.slice(0,4).map((data)=>{
                    return(
                        <div key={data._id} className="flex gap-6 ">
                            <img onClick={()=> navigate(`/rooms/${data._id}`)} src={data.image[0]} className="rounded-xl w-2/6"  alt="roomimage" />

                            <div className="flex flex-col gap-5">
                                <p className="text-gray-600 ">{data.hotel.address}</p>
                                <h1 onClick={()=> navigate(`/rooms/${data._id}`)} className="text-3xl text-gray-800 font-playfair">{data.hotel.name}</h1>

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
                                <p className="text-2xl text-gray-700">{currency}{data.pricePerNight}/night</p>
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
                    return ( <Checkbox  key={index} label={type} selected={selectedfilters.roomType.includes(type)} onChange={(checked)=> handlefilterChange(checked, type, 'roomType')} />)
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
                    return  <Checkbox key={index} label={`$ ${type}`}selected={selectedfilters.priceRange.includes(type)} onChange={(checked)=> handlefilterChange(checked, type, 'priceRange')}  />
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
                    return  <Radiobutton key={index} label={type} selected={sortoptions === type} onChange={()=> handlesortchange(type)} />
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
