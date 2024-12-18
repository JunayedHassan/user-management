const UserModel = require('../models/UserModel');
const {EncodeToken,DecodeToken} = require('../utility/TokenHelper');


// for user registration
exports.UserRegService = async (req, res) =>{
    try{
        await UserModel.create(req.body);
        const token = EncodeToken(req.body.email, req.body.password);

        // Cookies Option
        let cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        res.cookie('token',token, cookieOption );
        return {status:"success", data: token, message:"Profile Save Success"};
    }catch(err){
        return {status:"fail", message: err.message};
    }
}


// user login
exports.UserLoginService = async (req, res) =>{
    try{
    const email = req.body.email;
    const password = req.body.password;
    const token = EncodeToken(req.body.email, req.body.password);

    // Find user by email and match the password
    const user = await UserModel.findOne({ email });

    // If user is not found or password does not match
    if (!user || user.password !== password) {
        return { status: "fail", message: "Invalid email or password" };
    }

    // Cookies Option
    let cookieOption={expires:new Date(Date.now()+24*6060*1000), httpOnly:false}
    res.cookie('token',token, cookieOption );

    return { status: "success", token:token, message: "User authenticated" };

    }catch(err){
        return {status:"fail", message: err.message};
    }
}




// single profile read
exports.SingerUserProfileReadService = async (req, res) =>{
    try{
        const token = req.headers['token'] ?? req.cookies['token'];
        const {email} = DecodeToken(token);

        // Find user by email and match the password
        const user = await UserModel.findOne({ email }).select('-createdAt -updatedAt');

        return { status: "success", data:user, message: "User authenticated" };

    }catch(err){
        return {status:"fail", message: err.message};
    }
}

// all profile read
exports.AllUserProfileReadService = async (req, res) =>{
    try{

        // Find all user
        const users = await UserModel.find({}).select('-createdAt -updatedAt');

        return { status: "success", data:users, message: "User authenticated" };

    }catch(err){
        return {status:"fail", message: err.message};
    }
}



// profile update
exports.UserUpdateService = async (req, res) =>{
    try{
        const token = req.headers['token'] ?? req.cookies['token'];
        const updateData = req.body;
        const {email} = DecodeToken(token);


        // update user
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: email },
            { $set: updateData },
            { new: true, runValidators: true }
            );


        return { status: "success", data: updatedUser, message: "User updated" };

    }catch(err){
        return {status:"fail", message: err.message};
    }
}


// profile update
exports.userDeleteService = async (req, res) =>{
    try{
        const token = req.headers['token'] ?? req.cookies['token'];
        const {email} = DecodeToken(token);


        // delete user
        const deletedUser = await UserModel.findOneAndDelete({ email: email });

        if (!deletedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        return { status: "success", data: deletedUser, message: "User updated" };

    }catch(err){
        return {status:"fail", message: err.message};
    }
}
