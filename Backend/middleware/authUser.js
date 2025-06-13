import usermodel from "../models/usermodel.js";

const Userauth = async (req, res, next) =>{
    try{
        const {UserId} = req.auth;

        if(!UserId){
            return res.json({succes:true, message:"Not Authorized"});
        }

        const userdata = await usermodel.findById(UserId);
        req.user = userdata;

        next();
        
    }catch(error){
        res.json({success:true, message:error.message})
    }
}

export default Userauth