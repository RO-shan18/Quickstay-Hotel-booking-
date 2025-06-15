import React from "react";
import { assets } from "../assets/assets";

const Hotel_rooms = ({ room, index }) => {
  return (
    <div className="flex flex-col gap-6 rounded-xl ">
      <div>
        {index % 2 === 0 && (
          <p className="absolute m-2 rounded-lg bg-white px-2 py-1">BestSeller</p>
        )}

        <img className="rounded-t-xl"  src={room?.image[0]} alt="roomimage" />
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between px-4">
          <h1 className="font-playfair text-2xl text-gray-600">{room?.hotel?.name}</h1>
          <div className="flex gap-2 items-center">
          <img className="w-4" src={assets.starIconFilled} alt="rating" /> 
          <span className="text-black">4.5</span>
          </div>
        </div>
        <div className="flex justify-start px-4 gap-1 text-gray-400">
          <img src={assets.locationIcon} />
          <p className="text-sm">{room?.hotel.address}</p>
        </div>
      </div>
      <div className="flex justify-between px-4">
        <p className="text-xl text-gray-800">
          ${room?.pricePerNight} <span className="text-gray-500">/night</span>
        </p>
        <p className="text-gray-700">View Details</p>
      </div>
    </div>
  );
};

export default Hotel_rooms;
