import React, { useEffect } from 'react'
import Navbar from '../../components/Admin/Navbar'
import Sidebar from '../../components/Admin/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext();
  const {showsidebar} = useAppContext();

  useEffect(()=>{
    if(!isOwner){
       navigate('/')
    }
  },[isOwner])
  
  return (
    <div>
      <Navbar/>
      <div className='flex '>
      {showsidebar &&  <Sidebar/>}
        <div>
          <Outlet/>
        </div>
      </div>
      
    </div>
  )
}

export default Layout
