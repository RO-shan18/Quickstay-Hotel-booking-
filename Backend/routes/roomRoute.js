import express from 'express';
import Userauth from '../middleware/authUser.js';
import { AddHotelroom, getallrooms, getownerrooms } from '../controllers/roomcontroller.js';
import upload from '../middleware/multer.js';

const roomRouter = express.Router();

roomRouter.post('/add-room',upload.array("image", 4), Userauth, AddHotelroom);
roomRouter.get('/get-room', getallrooms);
roomRouter.get('/get-owner-room', Userauth, getownerrooms);
roomRouter.post('/toogle-availability', Userauth, AddHotelroom);

export default roomRouter;