import bookingmodel from "../models/bookingmodel.js"
import hotelmodel from "../models/hotelmodel.js";
import roommodel from "../models/roommodel.js"

const CheckAvailability = async({room, checkInDate, checkOutDate})=>{
    try{

        const bookings = await bookingmodel.find({
            room,
            CheckInDate : {$lte : checkOutDate},
            CheckOutDate : {$gte : checkInDate},
        })

        const available = bookings.length !== 0;
        return available

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

//check a availability of a room for a user
const CheckAvailabilityAPI = async(req, res)=>{
    try{

        const { room, checkInDate, checkOutDate} = req.body;

        const bookings =  await CheckAvailability(room, checkInDate, checkOutDate);
        
        res.json({success:true, message:bookings})

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

//create a booking for a user
const createbooking = async(req, res)=>{
    try{

        const {room, checkInDate, checkOutDate, guests} = req.body;

        //check availability
        const bookings = await CheckAvailability(room, checkInDate, checkOutDate);

        if(!bookings){
            return res.json({success:false, message:"Room is not available"});
        }
 
        //get totalprice from the room
        const roomdata = await roommodel.findById(room).populate("hotel");

        let totalprice = roomdata.pricePerNight;

        let first_day = new Date(checkInDate);
        let last_day = new Date(checkOutDate);

        let timediff = last_day.getTime() - first_day.getTime();

        let totalnights = Math.ceil(timediff / (1000 * 3600 * 24));

        totalprice *= totalnights;

        //create a booking for it
        const newbooking = new bookingmodel.create({
            room,
            checkInDate,
            checkOutDate,
            guests:+guests,
            user,
            hotel:roomdata.hotel._id,
            totalprice
        })

        res.json({sucess:true, message:"Booking created successfully"});
        
    }catch(error){
        res.json({success:false, message:error.message})
    }
}

//get a users bookings
const getuserbookingdetails = async(req, res)=>{
     try{
        const user = req.user._id;

        const bookings = await bookingmodel.find({user}).populate("room hotel");

        res.json({success:true, message:bookings})
        
    }catch(error){
        res.json({success:false, message:error.message})
    }
}

//get owner's hotel booking details
const getownerhoteldetails = async(req, res)=>{
    try{
        //check if the user a owner or not 
        const Hotel = await hotelmodel.find({owner : req.auth().UserId});

        if(!Hotel){
            return res.json({success:false, message: "No hotel found"});
        }

        //check if the hotel has any bookings
        const bookings = await bookingmodel.find({hotel: Hotel._id}).populate("User hotel room").sort({createdAt:-1})

        //total bookings for that hotel
        const totalBookings = bookings.length;

        //total Revenue generate by that hotel
        const totalRevenue = bookings.reduce((acc, booking)=> acc + booking.totalPrice, 0);

        res.json({success:true, Dashboard: {totalBookings, totalRevenue, bookings}});

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

export {CheckAvailabilityAPI, createbooking, getuserbookingdetails, getownerhoteldetails}