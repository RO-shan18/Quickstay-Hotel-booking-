import express from 'express';
import Userauth from '../middleware/authUser.js';
import { Addrecentsearchcities, getuserdata } from '../controllers/usercontroller.js';

const userRouter = express.Router();

userRouter.get('/', Userauth, getuserdata);
userRouter.post('/search-recent-cities', Userauth, Addrecentsearchcities);

export default userRouter;