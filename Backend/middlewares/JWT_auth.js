const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
    const Token = req.cookies.token;

    if (!Token) {
        return res.status(401).json({ msg: "User not logged in" })
    }

    const token = HeaderToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await FormData.findById(decoded._id).select("fullName email");


    res.json({
        fullName: user.fullName,
        email: user.email
    });

    req.user = decoded;
    next();
}