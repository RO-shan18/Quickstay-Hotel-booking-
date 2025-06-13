import express from 'express';
import Userauth from '../middleware/authUser.js';
import registerhotel from '../controllers/hotelcontroller.js';

const hotelRouter = express.Router();

hotelRouter.post('/', Userauth, registerhotel);

export default hotelRouter;