import React from 'react'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import HotelRooms from './pages/HotelRooms'
import RoomsDetails from './pages/RoomsDetails'
import Mybookings from './pages/Mybookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/dashboard'
import Lists from './pages/Admin/lists'
import Addrooms from './pages/Admin/Addrooms'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import Loader from './components/loader'
import { useState } from 'react'

const App = () => {
  const isowner = useLocation().pathname.includes('owner')
  const {showreghotel} = useAppContext();

  return (
    <div>
      <Toaster/>
       {!isowner && <Navbar/>}
        {showreghotel && <HotelReg/>}

       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/rooms' element={<HotelRooms/>} />
          <Route path='/rooms/:id' element={<RoomsDetails/>} />
          <Route path='/my-bookings' element={<Mybookings/>} />
          <Route path='/loader/:nextURL' element={<Loader/>} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard/>} />
            <Route path='add-rooms' element={<Addrooms/>}/>
            <Route path='list-rooms' element={<Lists/>}/>
          </Route>
       </Routes>

       <Footer/>
    </div>
  )
}

export default App
