import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({

    room : {
        type : String,
        required : true,
        ref : "room"
    },

    hotel : {
        type : String,
        required : true,
        ref : "hotel"
    },

    user : { 
        type : String,
        required : true,
        ref : "User"
    },

    checkInDate : {
        type : Date,
        required : true,
    },

    checkOutDate : {
        type : Date,
        required : true,
    },

    guests : {
        type : Number,
        required : true,
    },

    totalPrice : {
        type : Number,
        required :true,
    },

    status : {
        type : String,
        enum : ["Pending", "Confirmed", "Cancelled"],
        default : "Pending",
    },

    paymentMethod : {
        type : String,
        required : true,
        default : "Pay At hotel",
    },

    isPaid : {
        type : Boolean,
        default : false,
    }

}, {timestamps:true});

const bookingmodel = mongoose.model('booking', bookingSchema);

export default bookingmodel;