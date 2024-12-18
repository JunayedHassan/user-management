const {UserRegService, UserLoginService, SingerUserProfileReadService, AllUserProfileReadService, UserUpdateService, userDeleteService} = require('../services/UserServices');

exports.UserReg = async (req, res) => {
    let result = await UserRegService(req, res)
    return res.status(200).json(result)

}

exports.UserLogin = async (req, res) => {
    let result = await UserLoginService(req, res)
    return res.status(200).json(result)
}

exports.UserLogout = async (req, res) => {
    // to avoid error
    if(req.cookies && req.cookies['token']){
        let cookieOption={expires:new Date(Date.now()-24*60*60*1000), httpOnly:false}
        res.cookie('token',"",cookieOption)
        return res.status(200).json({status:"success"})
    }
}

exports.SingerUserProfileRead = async (req, res) => {
    let result = await SingerUserProfileReadService(req, res)
    return res.status(200).json(result)
}

exports.AllUserProfileRead = async (req, res) => {
    let result = await AllUserProfileReadService(req, res)
    return res.status(200).json(result)
}

exports.UserUpdate = async (req, res) => {
    let result = await UserUpdateService(req, res)
    return res.status(200).json(result)
}

exports.UserDelete = async (req, res) => {
    let result = await userDeleteService(req, res)
    return res.status(200).json(result)
}


