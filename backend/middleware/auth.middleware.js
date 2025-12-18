var jwt = require('jsonwebtoken');

const  authMiddleware = (req, res,next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if(token){
      var decoded = jwt.verify(token , 'shhhhh');
      if(decoded){
         res.status(201).json({ msg: "successfully  through auth middleware" },decoded);
         next();
      }else{
         res.status(401).json({ msg: "unauthorized ......" });
      }
    }else{
        res.status(401).json({ msg: "not through auth middleware" });
    }
}

module.exports = authMiddleware;