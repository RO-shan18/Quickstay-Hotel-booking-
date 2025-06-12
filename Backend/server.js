import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoose.js';
import { clerkMiddleware } from '@clerk/express'
import {clerkwebhooks} from './controllers/clerkwebhooks.js';

// App config
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());    
app.use(cors());
app.use(clerkMiddleware())

// api to listen clerk
app.use('/api/clerk', clerkwebhooks)

app.get('/', (req, res)=> res.send("API is working"));

//connect Database
connectDB().then(()=>{
     console.log("Database connected successfully");

     app.listen(PORT, ()=> console.log("App Listen to the port: ", PORT))
}).catch(()=>{
    console.log("Database not connected")
})


