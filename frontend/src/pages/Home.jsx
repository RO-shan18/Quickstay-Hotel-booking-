import React from 'react'
import Hero from '../components/Hero'
import Featured_destinations from '../components/Featured_destinations'
import ExclusiveOffer from '../components/ExclusiveOffer'
import Guests from '../components/guests'
import NewsLetter from '../components/NewsLetter'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
  return (
    <div>
        <Hero/>
        <RecommendedHotels/>
        <Featured_destinations/>
        <ExclusiveOffer/>
        <Guests/>
        <NewsLetter/>
    </div>
  )
}

export default Home
