import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";

const HotelReg = () => {
  const { setshowreghotel, axios, getToken, setisOwner, toast } =
    useAppContext();

  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");

  //register hotel
  const RegisterHotel = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/hotel",
        { name, contact , address, city },
        {
          headers: {
            Authorization : `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setisOwner(data.success);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  return (
    <div className="absolute flex z-100 gap-5 rounded-xl bg-white w-4/6 mx-auto top-10 bottom-0 h-fit right-0 left-0 backdrop-blur-lg">
      <img src={assets.regImage} className="w-3/6 " alt="regimage" />

      <form
        onSubmit={RegisterHotel}
        onClick={(e) => e.stopPropagation()}
        className="w-full flex flex-col gap-6 items-end "
      >
        <img
          className="w-4 m-3.5"
          src={assets.closeIcon}
          alt="closeicon"
          onClick={() => setshowreghotel(false)}
        />
        <div className="w-full px-5 flex flex-col items-center gap-5">
          <div>
            <h1 className="text-3xl font-playfair">Registration Hotel</h1>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* Hotel name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800" htmlFor="name">
                Hotel name
              </label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="text-gray-500 px-3 py-2"
                type="text"
                placeholder="Enter Hotel Name"
              />
            </div>
            {/* Phone number */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800" htmlFor="name">
                Phone
              </label>
              <input
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
                className="text-gray-500 px-3 py-2"
                type="Number"
                placeholder="Enter Hotel Name"
              />
            </div>
            {/* Hotel Address */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800" htmlFor="name">
                Address
              </label>
              <input
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                className="text-gray-500 px-3 py-2"
                type="text"
                placeholder="Enter Hotel Name"
              />
            </div>
            {/* City */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800" htmlFor="name">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setcity(e.target.value)}
                className="text-gray-500 px-3 py-2"
              >
                {cities.map((city, index) => {
                  return (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Hotel name */}
            <div className="flex flex-col gap-2 bg-blue-500 py-3 text-white rounded-lg">
              <button type="submit" value="Register">
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
