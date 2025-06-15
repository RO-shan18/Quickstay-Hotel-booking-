import hotelmodel from "../models/hotelmodel.js";
import usermodel from "../models/usermodel.js";

const registerhotel = async (req, res)=>{

    try{

        const {name, address, contact, city} = req.body;

        const owner = req.user._id;

        const hotel = await hotelmodel.findOne({owner});

        if(hotel){
            return res.json({success:false, message:"Hotel Already registered"});
        }

        await hotelmodel.create({name, address, contact, city, owner});

        await usermodel.findByIdAndUpdate(owner, {role : "hotelowner"});

        res.json({success:true, message: "Hotel Registered Successfully"});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}

export default registerhotel;