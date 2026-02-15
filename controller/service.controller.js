const Service = require("../model/service.model");
// const { create } = require("../model/user.model");
// const { create } = require("../model/user.model");


const createService = async (req,res)=>{
    try{
        const{name , description}= req.body;

        const service =await Service.create({
            name,
            description
        });

        res.status(201).json({
            message:"Service cerated successfully",
            service
     
        });

    }catch(error){
        res.status(500).json({
            message:"service creation failed",
            error:error.message
        });
    }
};

module.exports= {createService};
