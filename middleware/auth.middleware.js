const jwt = require("jsonwebtoken");

const protect = (req,res, next)=>{
    // console.log("Full Header:", req.headers.authorization);
    let token;

    //check the aurthorization and aslo if it start with Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            // extract token from the bearer
            token = req.headers.authorization.split(" ")[1];
            
            // console.log("Extracted Token:", token);


            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            //attach it to the user request
            req.user = decoded;

            next(); //move to next layer
        } catch (error) {
            console.log("JWT VERIFY ERROR:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
            }
        
        // catch (error) {
        //     console.log("JWT ERROR:", error.message);
        //     return res.status(401).json({ message: "Not authorized, token failed" });
        //     }
    }else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  };
// console.log("JWT Secret:", process.env.JWT_SECRET);



module.exports = {protect};