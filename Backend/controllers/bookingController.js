import transporter from "../config/nodemailer.js";
import bookingmodel from "../models/bookingmodel.js"
import hotelmodel from "../models/hotelmodel.js";
import roommodel from "../models/roommodel.js"
import Stripe from 'stripe'

const CheckAvailability = async(room, checkInDate, checkOutDate)=>{
    try{

        const bookings = await bookingmodel.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        })

        const available = bookings.length === 0;

        return available;

    }catch(error){
       console.log(error.message) 
    }
}

//check a availability of a room for a user
const CheckAvailabilityAPI = async(req, res)=>{
    try{

        const { room, checkInDate, checkOutDate } = req.body;

        const bookings =  await CheckAvailability(room, checkInDate, checkOutDate);
        
        if(bookings){
            res.json({success:true, message:"Room is available"})
        }
        else{
            res.json({success:false, message : "Room is not available"})
        }

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

//create a booking for a user
const createbooking = async(req, res)=>{
    try{

        const {room, checkInDate, checkOutDate, guests, paymentMethod} = req.body;
        const user = req.user._id

        //check availability
        const bookings = await CheckAvailability(room, checkInDate, checkOutDate);

        if(!bookings){
            return res.json({success:false, message:"Room is not available"});
        }
 
        //get totalprice from the room
        const roomdata = await roommodel.findById(room).populate("hotel");

        let totalPrice = roomdata.pricePerNight;

        let first_day = new Date(checkInDate);
        let last_day = new Date(checkOutDate);

        let timediff = last_day.getTime() - first_day.getTime();

        let totalnights = Math.ceil(timediff / (1000 * 3600 * 24));

        totalPrice *= totalnights;

        //create a booking for it
        const newbooking = await bookingmodel.create({
            room,
            checkInDate,
            checkOutDate,
            guests:+guests,
            user,
            hotel:roomdata.hotel._id,
            totalPrice, 
            paymentMethod
        })

        const info = {
            from: process.env.SENDER_MAIL,
            to: req.user.email,
            subject: "Hotel Booking Detail",
            html: ` <h2>Your Booking Details</h2>
                    <p>Dear ${req.user.username},</p>
                    <p>Thank you for your booking! Here are your details:</p>
                    <ul>
                    <li><strong>Booking ID:</strong> ${newbooking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomdata.hotel.name}</li>
                    <li><strong>Location:</strong> ${roomdata.hotel.address}</li>
                    <li><strong>Date:</strong> ${newbooking.checkInDate.toDateString()}</li>
                    <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || '$'} ${newbooking.totalPrice} /night</li>
                    </ul>
                    <p>We look forward to welcoming you!</p>
                    <p>If you need to make any changes, feel free to contact us.</p>`
        }

        try {
          await transporter.sendMail(info);
          console.log("✅ Email sent!");
        } catch (error) {
          console.error("❌ Error sending email:", error.message);
        }
       

        res.json({success:true, message:"Booking created successfully"});

      
        
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

const addStripePayment = async(req, res)=>{
    try{

        const {bookingId} = req.body;

        const booking = await bookingmodel.findById(bookingId);
        const room = await roommodel.findById(booking.room).populate('hotel');
        const totalPrice = booking.totalPrice;

        const {origin}  = req.headers;

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        //create line items
        const line_items = [{
            price_data : {
                currency : "usd",
                product_data : {
                    name : room.hotel.name
                },
               unit_amount :totalPrice * 100,
            },
            quantity : 1,
        }]

        //checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode : 'payment',
            success_url:`${origin}/loader/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata : {
                bookingId
            }
        })-

        res.json({success:true, url:session.url})
    }catch(error){
        res.json({success:false, message:error.message})
    }
}

export {CheckAvailabilityAPI, createbooking, getuserbookingdetails, getownerhoteldetails, addStripePayment}