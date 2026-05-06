
const express =require("express");
const router= express.Router();
// const protect= require("../middleware/auth.middleware");
const { protect } = require("../middleware/auth.middleware");

const {registerUser, login, getMe} =require("../controller/auth.controller");
router.post("/register", registerUser);
router.post("/login", login);

const { registerWorker } = require("../controller/auth.controller");

// Worker registration
router.post("/register-worker", registerWorker);


//protected routes
router.get("/profile",protect, (req,res) => {
    res.json({
        message:"profile accessed successfully",
        user:req.user   
    });
});

router.get("/me", protect, getMe);

module.exports = router;



// 152.56.183.233)











// const express= require("express");

// const router = express.Router();

// router.post("/login", (req,res)=>{
//     // const{email,password} =req.body;
//     // console.log(email,password);

//     const { email, password } = req.body;

//   // 👇 this will print in terminal
//   console.log("Email:", email);
//   console.log("Password:", password);


//     res.json({ message:"Login route working"});
   
// });

// module.exports=router;