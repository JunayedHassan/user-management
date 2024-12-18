const {DecodeToken} = require("../utility/TokenHelper")

module.exports = (req, res, next) =>{

// receive token from header or cookie
  let token = req.headers['token'] ?? req.cookies['token'];

// decode token
let decode = DecodeToken(token);
// add email and user_id inside headers
if(decode===null){
    return res.status(401).json({status: "fail", message:"unauthorized"});
}else{
    let {email, password} = decode;
    req.headers.email = email;
    req.headers.user_id = password;
    next();
}


};