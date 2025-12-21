var jwt = require('jsonwebtoken');

const  authMiddleware = (role) => {


    return (req, res,next) => {

    try{
        const token = req.headers?.authorization?.split(" ")[1];

           if(token){
             var decoded = jwt.verify(token , process.env.JWT_SECRET);
             if(decoded){
               if(role.includes(decoded.role)){
                  req.user = decoded;
                  next();
               }
             }else{
                res.status(403).json({ msg: "unauthorized ......" });
             }
           }
    }catch(err){
       res.status(401).json({ msg: "Invalid or expired token"});
    }
}}

module.exports = authMiddleware;