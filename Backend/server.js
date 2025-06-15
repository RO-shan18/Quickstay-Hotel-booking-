import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoose.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkwebhooks.js";
import userRouter from "./routes/userroute.js";
import hotelRouter from "./routes/hotelroute.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingroute.js";
import connectcloudinary from "./config/cloudinary.js";

// App config
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// api to listen clerk
app.post(
  "/api/clerk",
  (req, res, next) => {
    console.log("🔥 Webhook route triggered");
    next();
  },
  clerkwebhooks
);

//user Routes
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/booking", bookingRouter);

app.get("/", (req, res) => res.send("API is working"));


//connect Database
connectDB()
  .then(() => {

    //connect cloudinary 
    connectcloudinary()
      .then(() => {
        console.log("Connect Cloudinary successfully");
      })
      .catch(() => {
        console.log("Doesn't connect");
      });

    console.log("Database connected successfully");

    app.listen(PORT, () => console.log("App Listen to the port: ", PORT));
  })
  .catch(() => {
    console.log("Database not connected");
  });
