import hotelmodel from "../models/hotelmodel.js";
import roommodel from "../models/roommodel.js";

const AddHotelroom = async(req, res)=>{
    try{
        
        const {roomType, aminities, pricePerNight} = req.body;

        const hotel = await hotelmodel.findOne({owner : req.user._id});

        if(!hotel){
            return res.json({success:false, message: "No hotel found"});
        }

        //upload images to cloudinary
        const uploadimages = req.files;

        const images = imagefiles.map(async(image)=>{
            const response = await cloudinary.uploader.upload(image.path);
            return response.secure_url;
        })

        const image = await Promise.all(images);

        const roomsdata = new roommodel({
            roomType : roomType,
            aminities : JSON.parse(aminities),
            pricePerNight : +pricePerNight,
            image,
            hotel : hotel._id,
        })

        await roomsdata.save();

        res.json({success:true, message:"Hotel Added successfully"})
    }catch(error){
        res.json({success:false, message:error.message});
    }

}

//get all rooms 
const getallrooms = async(req, res)=>{

    try{

        const rooms = await roommodel.find({isAvailable : true}).populate({
            path : 'hotel',
            populate : {
                path : 'owner',
                select : 'image',
            }
        }).sort({creatdAt : -1});

        res.json({success:true, message:rooms});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}

//get rooms for a specific hotels
const getownerrooms = async(req, res)=>{
    try{

        const hoteldata = await hotelmodel({owner : req.auth.UserId});

        const rooms = await roommodel.findById({hotel : hoteldata._id.toString()}).populate('hotel');

        res.json({success:true, message:rooms});

    }catch(error){
         res.json({success:false, message:error.message});
    }
}

//toggle availability
const toggleroomsavailability = async(req, res)=>{
    try{
       const {roomId} = req.body;
       const rooms = await roommodel.findById(roomId);
       rooms.isAvailable = !rooms.isAvailable;
       await rooms.save();
       res.json({success:true, message:"Availability updated"});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}
export {AddHotelroom, getallrooms, getownerrooms, toggleroomsavailability};