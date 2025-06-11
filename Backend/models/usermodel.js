import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true,
    },

    username : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    image : {
        type : String,
        required : true,
    },

    role : {
        type : String,
        enum : ["user", "owner"],
        default : "user",
    },

    recentSearchCities : [{
        type : String,
        required : true,
    }]
}, {timestamps : true});

const usermodel = mongoose.models.user ||  mongoose.model('user', userSchema)

export default usermodel;