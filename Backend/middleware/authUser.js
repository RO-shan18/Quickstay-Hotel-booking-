import usermodel from "../models/usermodel.js";

const Userauth = async (req, res, next) =>{
    try{
        const {userId} = req.auth();

        if(!userId){
            return res.json({succes:false, message:"Not Authorized"});
        }

        const userdata = await usermodel.findById(userId);
        req.user = userdata;

        next();
        
    }catch(error){
        res.json({success:true, message:error.message})
    }
}

export default Userauth