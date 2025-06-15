import React, { useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../../context/AppContext";
import { useEffect } from "react";

const Lists = () => {
  const [roomsdata, setroomsdata] = useState([]);
  const {getToken, axios, toast, user} = useAppContext();

  const listrooms = async()=>{
    try{
      const {data} = await axios.get('/api/rooms/get-owner-room', {headers : {
          Authorization : `Bearer ${await getToken()}`
        }})

      if(data.success){
         setroomsdata(data.message)
         
      }else{
        toast.error(data.message);
      }
    }catch(error){
       toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(user)
    listrooms();
  },[user])

  //availability check
  const checkavailability = async(roomId)=>{
     try{
        
       const {data} = await axios.post('/api/rooms/toogle-availability', {roomId}, {headers : {
          Authorization : `Bearer ${await getToken()}`
        }}) 

        if(data.success){
          toast.success(data.message);
          listrooms();
        }else{
          toast.error(data.message);
        }
     }catch(error){
       toast.error(error.message)
     }
  }

  return (
    <div className="m-10 flex flex-col gap-9">
      <Title
        font="Outlook"
        title="Room Listings"
        desc="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.Want help rewriting this in a more engaging or professional tone?"
      />

      {/* table */}
      <div className="flex flex-col gap-5">
        <p className="text-gray-600 text-xl">All Rooms</p>
        <table>
          <thead className="text-gray-800 text-bold text-xl ">
            <tr>
              <th className="px-6 py-3 border border-gray-300 bg-gray-100 ">
                Name
              </th>
              <th className="px-6 py-3 border border-gray-300 bg-gray-100">
                Facility
              </th>
              <th className="px-6 py-3 border border-gray-300 bg-gray-100">
                Price/Night
              </th>
              <th className="px-6 py-3 border border-gray-300 bg-gray-100">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {roomsdata.map((data) => {
              return (
                <tr className="text-center" key={data._id}>
                  <td className="px-6 py-3 border border-gray-300 text-gray-500">
                    {data.roomType}
                  </td>
                  <td className="px-6 py-3 border border-gray-300 text-gray-500">
                    {data.amenities.join(", ")}
                  </td>
                  <td className="px-6 py-3 border border-gray-300 text-gray-500">
                    {data.pricePerNight}
                  </td>
                  <td  className="py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center">
                    <label  className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onChange={() => checkavailability(data._id)}
                        type="checkbox"
                        className="sr-only peer"
                        checked={data.isAvailable}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
