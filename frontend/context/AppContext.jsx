import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import  {useUser, useAuth} from '@clerk/clerk-react'
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY;
    const {user} = useUser();
    const {getToken} = useAuth();

    const [isOwner , setisOwner] = useState(false);
    const [showreghotel, setshowreghotel] = useState(false);
    const [searchcities, setsearchcities] = useState([]);
    const [rooms, setrooms] = useState([]);

    //get user from the backend
    const getuserdata = async()=>{
        try{

            const {data} = await axios.get('/api/user/', {headers : {
                Authorization : `Bearer ${await getToken()}`,
            }});

            if(data.success){
                setisOwner(data.role === 'hotelowner');
                setsearchcities(data.recentSearchCities);
            }else{
                setTimeout(() => {
                    getuserdata();
                }, 5000);
            }

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    //get all rooms for user
    const getallrooms = async()=>{
        try{

           const {data} = await axios.get('/api/rooms/get-room');

           console.log(data);

           if(data.success){
            setrooms(data.message);
           }else{
            toast.error(data.message)
           }

        }catch(error){
            toast.error(error.message)
        }
    }

    //get user data
    useEffect(()=>{
        if(user){
            getuserdata();
        }
    }, [user])

    //get all rooms
    useEffect(()=>{
         getallrooms();
    },[]);


    const value={
        currency, user, navigate, isOwner, setisOwner, showreghotel, setshowreghotel, searchcities, setsearchcities, toast, axios, getToken, rooms, setrooms, getallrooms
    }


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);

