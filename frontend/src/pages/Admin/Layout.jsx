import React from 'react'
import Navbar from '../../components/Admin/Navbar'
import Sidebar from '../../components/Admin/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex '>
        <Sidebar/>
        <div>
          <Outlet/>
        </div>
      </div>
      
    </div>
  )
}

export default Layout
