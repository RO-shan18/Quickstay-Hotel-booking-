import express from 'express'
import Userauth from '../middleware/authUser.js';
import { addStripePayment, CheckAvailabilityAPI, createbooking, getownerhoteldetails, getuserbookingdetails } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', CheckAvailabilityAPI);
bookingRouter.post('/create-booking', Userauth, createbooking);
bookingRouter.get('/user-booking-detail', Userauth, getuserbookingdetails);
bookingRouter.get('/owner-hotel-detail', Userauth, getownerhoteldetails);

bookingRouter.post('/stripe-payment', Userauth, addStripePayment);
 
export default bookingRouter
