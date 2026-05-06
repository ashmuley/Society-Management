const User = require("../model/User.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name,email,password,phone,buildingadd,flatNumber } = req.body;

    // validation
    if (!name || !email || !password || !phone || !buildingadd || !flatNumber) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 🔐 hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      buildingadd,
      flatNumber,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        buildingadd: user.buildingadd,
        flatNumber: user.flatNumber,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({  
      message: "Server error",
      error: error.message,
    });
  }
};

const login = async (req,res)=>{
  try{
    const {email,password }= req.body;

        //validation
        if(!email || !password){
            return res.status(400).json({
            succes:false,
            message:"email and password required",
            });
        }

          //find userr
          const user= await User.findOne({email});

        if(!user){
          return res.status(401).json({
            succes:false,
            message:"Invaild email or password",
          });

        }
        
        //compare password
      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
          return res.status(401).json({
            succes:false,
            message:"Invaild email or password",
          });
        }

      if (user.role === "worker" && !user.verified) { 
          return res.status(403).json({
             success: false,
            message: "Your account is not verified yet. Please wait for admin approval.",
          });
        }
        
      //generating the token
        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {expiresIn:"1d"}
        );
      
        res.status(200).json({
          succes:true,
          message:"Login successful",
          token,
          role: user.role,
          user: {
            name: user.name,
          },
        });

  
}catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// REGISTER WORKER
const registerWorker = async (req, res) => {
  try {
    const { name, email, password, service, experience, hourlyRate } = req.body;

    // 1. validation
    if (!name || !email || !password || !service) {
      return res.status(400).json({
        message: "Name, email, password and service are required",  
      });
    }

    // 2. check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3. hash password                                             
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create worker
    const worker = await User.create({
      name,
      email,
      password: hashedPassword,

      role: "worker",     // 🔒 force worker role
      verified: false,    // 🔒 must be approved

      service,
      experience,
      hourlyRate,
    });

    

    // 5. response
    res.status(201).json({
      message: "Worker registered successfully. Wait for admin approval.",
      worker: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
        role: worker.role,
        verified: worker.verified,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  registerUser,
  login,
  registerWorker,
  getMe,
};
  




