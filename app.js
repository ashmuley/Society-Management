const express =require("express");

require("dotenv").config();
const connectDB = require("./config/db");
const app =express();
const cors = require("cors");
app.use(express.json());
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//import routes
const authRoutes = require("./routes/auth.routes");

const service = require("./routes/service.routes");
const workerRoutes = require("./routes/worker.routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");


//use routes
app.use("/api/workers", workerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", service);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/",(req,res)=>{
  res.send("Society management backend running");
});

//server hai
app.listen(3000, ()=> {
  console.log("the server si running on port 3000");


});
















// const express = require("express");

// const app = express();

// //middleware very important
// app.use(express.json());

// app.get("/", (req,res)=> {
//     res.send("society management backend running");
// });

// app.get("/services", (req, res) => {
//   res.send("All society services");
// });

// app.post("/login", (req, res) => {
//     const{email, password}=req.body;
//     console.log(email,password);

//   res.json({message:"login sucess"});
// });

// app.listen(3000, () =>{
//     console.log("server running on port 3000");
// });