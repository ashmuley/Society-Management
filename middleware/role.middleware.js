const authorizeRoles = (...allowedRoles)=>{
    return (req,res,next) =>{
        try{

            //check is user exists
            if(!req.user){
                return res.status(401).json({
                    message:"unauthorized please login"
                });
            }

            if(!allowedRoles.includes(req.user.role)){
                return res.status(403).json({
                    message:"Access deined, u do not have persmission"
                });
            }
            //if everything is fine move to next
            next();

        }catch(error){
            return res.status(500).json({
                message:"role authorization failed"
            });
        }
    };
};

module.exports = {authorizeRoles};