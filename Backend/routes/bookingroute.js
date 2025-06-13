import express from 'express'
import Userauth from '../middleware/authUser.js';
import { CheckAvailabilityAPI, createbooking, getownerhoteldetails, getuserbookingdetails } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', CheckAvailabilityAPI);
bookingRouter.post('/create-booking', Userauth, createbooking);
bookingRouter.get('/user-booking-detail', Userauth, getuserbookingdetails);
bookingRouter.get('/owner-hotel-detail', Userauth, getownerhoteldetails);

export default bookingRouter
