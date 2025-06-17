import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffer = () => {
  return (
    <div className="flex flex-col gap-9">
      <div className="grid grid-cols-[1fr] md:gap-0 gap-5 md:flex w-full xl:w-3/4 justify-between mx-auto xl:px-0 px-7">
        <Title
          title="Exclusive Offers"
          desc="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />
        <button className="group flex gap-1 items-center">
          View All Offers
          <img
            className="w-4 group-hover:translate-x-1 transition-all"
            src={assets.arrowIcon}
            alt="viewoffers"
          />
        </button>
      </div>

      <div className="grid grid-cols-[1fr] md:flex justify-evenly gap-5 w-full xl:px-0 px-5  xl:w-3/4 xl:mx-auto">
        {exclusiveOffers.map((item) => {
          return (
            <div key={item._id} className="group flex flex-col gap-5 bg-cover bg-center w-full rounded-xl text-white py-2 px-4"  style={{ backgroundImage: `url(${item.image})` }}>
              <div className="flex flex-col gap-4">
                <div className="flex ">
                <p className="text-black bg-white px-2 py-1 text-md rounded-2xl text-sm">{item.priceOff}% OFF</p>
                </div>
                <div>
                  <h1 className="text-2xl font-playfair">{item.title}</h1>
                  <p className="text-sm">{item.description}</p>
                </div>
                <p className="text-sm">Expires: {item.expiryDate}</p>
              </div>

              <button className="group flex gap-1 items-center ">
                View All Offers
                <img
                  className="text-white w-4 group-hover:translate-x-1 transition-all text-md invert"
                  src={assets.arrowIcon}
                  alt="viewoffers"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExclusiveOffer;
