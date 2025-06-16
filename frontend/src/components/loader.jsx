import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const  Loader = () => {
    const {navigate} = useAppContext();
    const {nextURL} = useParams();

    useEffect(()=>{
        if(nextURL){
            setTimeout(() => {
                 navigate(`/${nextURL}`)
            }, 5000);
        }
    },[nextURL])
  return (
    <div className='flex justify-center items-center h-screen'>
       <div className='animate-spin rounded-full h-25 w-25 border-4 border-gray-300 border-t-primary'></div>
    </div>
  )
}

export default  Loader
