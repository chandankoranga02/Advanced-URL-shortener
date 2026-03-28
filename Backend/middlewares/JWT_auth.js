const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next)=>{
    const HeaderToken = req.headers.authorization;
     
    if(!HeaderToken){
        return res.status(401).json({msg : "No token is recieved"})
    }

    const token = HeaderToken.split(" ")[1];
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);

    req.user =  decoded;
    next();
}