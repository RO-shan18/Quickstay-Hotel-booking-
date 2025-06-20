import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, userDummyData } from "../assets/assets";
import Rating from "../components/Rating";
import { useAppContext } from "../../context/AppContext";

const RoomsDetails = () => {
  const { id } = useParams();
  const { rooms, axios, toast, navigate, getToken } = useAppContext();
  const [roomdata, setroomdata] = useState(null);
  const [mainimage, setmainimage] = useState();

  const [checkInDate, setcheckInDate] = useState(null);
  const [checkOutDate, setcheckOutDate] = useState(null);
  const [guests, setguests] = useState(1);
  const [isAvailable, setisAvailable] = useState(false);

  useEffect(() => {
    let room = rooms.find((room) => room._id === id);
    room && setroomdata(room);
    room && setmainimage(room.image[0]);
  }, [rooms]);

  const CheckAvailability = async () => {
    if (checkInDate > checkOutDate) {
      toast.error("Check in date should be less than checkoutdate");
    }

    try {
      const { data } = await axios.post("/api/booking/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        setisAvailable(true);
        toast.success(data.message);
      } else {
        setisAvailable(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submithandler = async (e) => {
    try {
      e.preventDefault();

      if (!isAvailable) {
        return CheckAvailability();
      } else {

        const {data}  = await axios.post(
          "/api/booking/create-booking",
          { room: id, checkInDate, checkOutDate, guests, paymentMethod : "Pay At hotel"},
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );

        console.log(data);

        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    roomdata && (
      <div className="mt-30 w-full md:w-5/6 md:mx-auto md:px-0 px-7 flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          {/* Hotel name */}
          <div className="flex gap-2 flex-wrap items-center">
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
        <div className="flex flex-col md:flex-row gap-4">
          <img className="w-full md:w-2/4 rounded-xl" src={mainimage} alt="image" />
          <div className="grid grid-cols-4 md:grid-cols-2 gap-3 ">
            {roomdata.image.map((img, index) => {
              return (
                <img
                  key={index}
                  onClick={() => setmainimage(img)}
                  className={` ${
                    mainimage === img && "border-4 border-orange-500"
                  } rounded-xl`}
                  src={img}
                  alt="images"
                />
              );
            })}
          </div>
        </div>

        {/* Other information */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="text-gray-800 text-2xl md:text-3xl font-playfair">
              Experience Luxury Like Never Before
            </p>
            <p className="text-md md:text-xl">${roomdata.pricePerNight}/night</p>
          </div>
            <div className="flex gap-4 flex-wrap">
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

        {/* form date */}
        <form
          onSubmit={submithandler}
          className="flex lg:flex-row flex-col gap-4 text-gray-700  px-5 py-4  shadow shadow-gray-400 justify-between my-5 "
        >
          <div className="flex md:flex-row  flex-col gap-3 ">
            <div className="flex flex-col items-start">
              <p className="px-4 text-gray-800"> Check-in</p>
              <input
                onChange={(e) => setcheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="px-4 text-gray-400"
                type="date"
                id="dates"
                placeholder="Add date"
              />
            </div>
            <hr className="w-[0.4px] h-14 md:block hidden  bg-gray-300" />
            <div className="flex flex-col items-start">
              <p className="px-4 text-gray-800">Check-out</p>
              <input
                onChange={(e) => setcheckOutDate(e.target.value)}
                disabled={!checkInDate}
                min={checkInDate}
                className="px-4 text-gray-400"
                type="date"
                id="dates"
                placeholder="Add date"
              />
            </div>
            <hr className="w-[0.4px] h-14 md:block hidden bg-gray-300" />
            <div className="flex flex-col items-start">
              <p className="px-4 text-gray-800">Guests</p>
              <input
                onChange={(e) => setguests(e.target.value)}
                value={guests}
                className="px-4 text-gray-400"
                type="Number"
                id="dates"
                placeholder="2 guests"
              />
            </div>
          </div>

          <button
            className="bg-blue-600 text-white rounded-sm w-full  sm:w-1/2   lg:w-3/12 px-10 lg:py-0 py-2"
            type="submit"
            value="Check Availability"
            disabled={!checkInDate && !checkOutDate}
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>

        {/* information of facilities */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-start gap-1">
            <img src={assets.homeIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Clean Room</p>
              <p className="text-gray-500">
                You will have the clean room for you.
              </p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-1">
            <img className="py-0" src={assets.badgeIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Enhanced Clean</p>
              <p className="text-gray-500">
                You will have the clean room for you.
              </p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-1">
            <img src={assets.locationFilledIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Great location</p>
              <p className="text-gray-500">
                You will have the clean room for you.
              </p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-1">
            <img src={assets.heartIcon} alt="homeiconimage" />
            <div className="flex flex-col">
              <p>Great check-in experience</p>
              <p className="text-gray-500">
                You will have the clean room for you.
              </p>
            </div>
          </div>
        </div>

        {/* Extra text */}
        <p className="text-gray-500 my-5 py-7 border-t border-gray-300 border-b ">
          Guests will be allocated on the ground floor according to
          availability. You get a comfortable Two bedroom apartment has a true
          city feeling. The price quoted is for two guest, at the guest slot
          please mark the number of guests to get the exact price for groups.
          The Guests will be allocated ground floor according to availability.
          You get the comfortable two bedroom apartment that has a true city
          feeling.
        </p>

        {/* reviews */}
        <div className="md:flex flex-col gap-5  hidden">
          <div className="flex gap-2 justify-start items-start">
            <img
              className="w-12 rounded-4xl"
              src={userDummyData.image}
              alt="userimage"
            />

            <div className="flex flex-col gap-5 text-gray-900">
              <div>
                <p>Hosted by {userDummyData.username}</p>
                <div className="flex gap-8 text-sm">
                  <div className="flex gap-4 md:w-4 w-2">
                    <Rating />
                    <p>200+ reviews</p>
                  </div>
                  <p>Response rate: 100%</p>
                  <p>Response time: 30 min</p>
                </div>
              </div>
              {/* contact button */}
              <button className="bg-blue-600 text-white rounded-sm py-2 w-2/">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomsDetails;
