const User = require("../model/User.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
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
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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
        });

  
}catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  login,
};






// const User = require("../model/User.model");
// const bcrypt = require("bcrypt");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // find user
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // success
//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// module.exports = { login };
