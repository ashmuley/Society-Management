const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim : true,
        },
        email: {
            type: String,
            required:true,
            unique: true,
            lowercase:true,
        },

        password: {
            required: true,
            type: String,
            minlength: 6,
        },

        phone: {
            type: String,
        },

        buildingadd: {
            type: String,
        },

        flatNumber: {
            type: String,
        },

        role: {
            type: String,
            enum: ["admin", "resident","worker"],
            default: "resident",
        },
        
        verified: {
            type: Boolean,
            default: false,
        },

        service: {
            type: String,
        },

        experience: {
            type: Number,
        },

        hourlyRate: {
            type: Number,
        },
    
    },

    {
        timestamps:true,
    }

);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);


