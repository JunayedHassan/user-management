const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIDNumber: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    bloodGroup: {type: String, required: true},
    email: {type: String, required: true, unique: true,
            validate: {
            validator: (value) => {
                // Check if the email contains an '@' symbol
                return value.includes('@');
            },
            message: 'Email must contain "@"'
        }},
    password: {type: String, required: true}
},
    {
        timestamps: true,
        versionKey: false,
    });
const UserModel = mongoose.model('users', DataSchema);
module.exports = UserModel;