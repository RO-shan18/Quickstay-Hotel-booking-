import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../../../context/AppContext'

const Navbar = () => {
  const {setshowsidebar, showsidebar} = useAppContext();
  return (
    <div className='flex justify-between py-5 px-8 mx-auto  border-b border-gray-200'>
      {/* logo */}
      <div onClick={()=> setshowsidebar(!showsidebar)} className='flex gap-6'>
       <img className='md:hidden invert opacity-80' src={assets.menuIcon} alt="menuicon"/>
        <Link to='/'>
          <img className="invert opacity-80" src={assets.logo} alt="logo" />
        </Link>
      </div>
        <UserButton/>
    </div>
  )
}

export default Navbar
