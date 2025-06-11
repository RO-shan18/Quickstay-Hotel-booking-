import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData, userDummyData } from "../assets/assets";
import Rating from "../components/Rating";

const RoomsDetails = () => {
  const { id } = useParams();

  const [roomdata, setroomdata] = useState(null);
  const [mainimage, setmainimage] = useState();

  useEffect(() => {
    let room = roomsDummyData.find((room) => room._id === id);
    room && setroomdata(room);
    room && setmainimage(room.images[0]);
  }, []);

  return (
    roomdata && (
      <div className="my-30 w-5/6 mx-auto flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          {/* Hotel name */}
          <div className="flex gap-2 items-center">
            <h1 className="text-3xl text-gray-800 font-playfair">
              {roomdata.hotel.name}{" "}
              <span className="text-xs text-gray-900">
                ({roomdata.roomType})
              </span>
            </h1>
            <p className="bg-orange-500 text-white px-2 rounded-xl">20% Off</p>
          </div>

          {/* Ratings */}
          <div className="flex gap-9 ">
            <Rating />
            <p>200+ reviews</p>
          </div>

          {/* location */}
          <div className="flex gap-2 text-gray-700 text-sm">
            <img src={assets.locationIcon} alt="locationimage" />
            <p>{roomdata.hotel.address}</p>
          </div>
        </div>

        {/* images */}
        <div className="flex gap-4">
          <img className="w-2/4 rounded-xl" src={mainimage} alt="image" />
          <div className="grid grid-cols-2 gap-3 ">
            {roomdata.images.map((image, index) => {
              return (
                <img
                  key={index}
                  onClick={() => setmainimage(image)}
                  className={` ${
                    mainimage === image && "border-4 border-orange-500"
                  } rounded-xl`}
                  src={image}
                  alt="images"
                />
              );
            })}
          </div>
        </div>

        {/* Other information */}
        <div className="flex justify-between ">
          <div className="flex flex-col gap-4">
            <p className="text-gray-800 text-3xl font-playfair">
              Experience Luxury Like Never Before
            </p>
            <div className="flex gap-4">
              {roomdata.amenities.map((aminity, index) => {
                return (
                  <div
                    className=" bg-gray-200 px-2 py-1 flex gap-3"
                    key={index}
                  >
                    <img src={facilityIcons[aminity]} alt="aminityicon" />
                    <p>{aminity}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xl">${roomdata.pricePerNight}/night</p>
        </div>

        {/* form date */}
        <form className="flex gap-4 text-gray-700  px-5 py-4  shadow shadow-gray-400 justify-between my-5">
          <div className="flex gap-3 ">
            <div className="flex flex-col items-start">
              <p className="px-4 text-gray-800"> Check-in</p>
              <input
                className="px-4 text-gray-400"
                type="date"
                id="dates"
                placeholder="Add date"
              />
            </div>
            <hr className="w-[0.4px] h-14 bg-gray-300" />
            <div className="flex flex-col items-start">
              <p className="px-4 text-gray-800">Check-out</p>
              <input
                className="px-4 text-gray-400"
                type="date"
                id="dates"
                placeholder="Add date"
              />
            </div>
            <hr className="w-[0.4px] h-14 bg-gray-300" />
            <div className="flex flex-col items-start">
              <p className="px-4 text-gray-800">Guests</p>
              <input
                className="px-4 text-gray-400"
                type="Number"
                id="dates"
                placeholder="2 guests"
              />
            </div>
            <hr className="w-[0.4px] h-14 bg-gray-300" />
          </div>

          <button
            className="bg-blue-600 text-white rounded-sm px-10 "
            type="submit"
            value="Check Availability"
          >
            Check Availability
          </button>
        </form>

        {/* information of facilities */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-start gap-1">
            <img src={assets.homeIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Clean Room</p>
              <p className="text-gray-500">You will have the clean room for you.</p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-1">
            <img className="py-0" src={assets.badgeIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Enhanced Clean</p>
              <p className="text-gray-500">You will have the clean room for you.</p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-1">
            <img src={assets.locationFilledIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Great location</p>
              <p className="text-gray-500">You will have the clean room for you.</p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-1">
            <img src={assets.heartIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Great check-in experience</p>
              <p className="text-gray-500">You will have the clean room for you.</p>
            </div>
          </div>
        </div>

        {/* Extra text */}
        <p className="text-gray-500 my-5 py-7 border-t border-gray-300 border-b ">
            Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.
        </p>

        {/* reviews */}
        <div className="flex flex-col gap-5">
        <div className="flex gap-2 justify-start items-start">
            <img className="w-12 rounded-4xl" src={userDummyData.image} alt="userimage"/>

            <div className="flex flex-col gap-5 text-gray-900">
                <div>
                <p>Hosted by {userDummyData.username}</p>
                <div className="flex gap-8 text-sm">
                    <div className="flex gap-4"><Rating/>
                    <p>200+  reviews</p></div>
                    <p>Response rate: 100%</p>
                    <p>Response time: 30 min</p>
                </div>
                </div>
                 {/* contact button */}
                <button className="bg-blue-600 text-white rounded-sm py-2 w-2/">Contact Now</button>
            </div>
        </div>
        </div>
      </div>
    )
  );
};

export default RoomsDetails;
