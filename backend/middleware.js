
const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken")
function userjwtVerify(req,res,next){
    const token = req.headers.token;
    const decode  = jwt.verify(token,JWT_SECRET);
    if(decode) {
        req.userId = decode.indexOf;
        next()
    }else{
        res.status(403).json({
            message:'You are not signed in'
        })
    }
}
module.exports={
    userjwtVerify
}