import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between py-5 px-8 mx-auto  border-b border-gray-200'>
      {/* logo */}
        <Link to='/'>
          <img className="invert opacity-80" src={assets.logo} alt="logo" />
        </Link>
        <UserButton/>
    </div>
  )
}

export default Navbar
