const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    residentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },

    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    bookingTime:{
        type: String,
        required:true,
    },
    issue: {
        type: String,
        trim: true
    },

    status: {
        type:String,
        enum: ["pending",
        "accepted",
        "in_progress",
        "completed",
        "rejected",
        "cancelled",
        ],
        default:"pending",
    },

    

    otp: {
        type: String,
    },

    price: {
        type:Number,
    },
},
    {
        timestamps: true,
    }
);

// bookingSchema.methods.generateOTP = function () {
//   this.otp = Math.floor(1000 + Math.random() * 9000).toString();
// };

module.exports = mongoose.model("Booking", bookingSchema);