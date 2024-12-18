const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../config/config");

// encoder
exports.EncodeToken=(email,user_id)=>{
    let KEY=JWT_KEY;
    let EXPIRE={expiresIn: '24h'}
    let PAYLOAD={email:email, user_id:user_id}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

// decoder
exports.DecodeToken=(token)=>{
    try {
        let KEY=JWT_KEY;
        return jwt.verify(token,KEY)
    }
    catch (e) {
        return null
    }
}