import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  
  const navlinks = [
    { name:"Dashboard", path:"/owner", icon: assets.dashboardIcon},
    { name:"Add Room", path:"/owner/add-rooms", icon: assets.addIcon},
    { name:"List Room", path:"/owner/list-rooms", icon: assets.listIcon},
  ]
  return (
    <div className='w-fit h-full absolute md:static bg-white'>
        <div className=' h-screen flex flex-col  border-r border-gray-200 pt-2'>
          {
            navlinks.map((link, index)=>{
              return(
                <NavLink end='/owner' className={({isActive})=>`flex gap-3 text-gray-800 px-8 py-4 ${isActive && "bg-blue-200 border-r-4 border-blue-500"}`}  to={link.path} key={index}>
                   <img src={link.icon} lat="iconimage" />
                   <p>{link.name}</p>
                </NavLink>
              )
            })
          }
        </div>
       
    </div>
  )
}

export default Sidebar
