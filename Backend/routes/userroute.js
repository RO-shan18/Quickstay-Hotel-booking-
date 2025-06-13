import express from 'express';
import Userauth from '../middleware/authUser';
import { Addrecentsearchcities, getuserdata } from '../controllers/usercontroller';

const userRouter = express.Router();

app.get('/', Userauth, getuserdata);
app.post('/search-recent-cities', Userauth, Addrecentsearchcities);

export default userRouter;