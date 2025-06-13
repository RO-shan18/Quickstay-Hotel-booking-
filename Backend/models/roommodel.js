import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({

    roomType : {
        type : String,
        required : true,
    },

    pricePerNight : {
        type : Number,
        required : true,
    },

    amenities : {
        type : Array,
        required : true,
    },

    images : [{ 
        type : String,
    }],

    hotel : {
        type : String,
        required : true,
        ref: "hotel",
    },

    isAvailable : {
        type : Boolean,
        default : true,
    }

}, {timestamps:true});

const roommodel = mongoose.model('room', roomSchema);

export default roommodel