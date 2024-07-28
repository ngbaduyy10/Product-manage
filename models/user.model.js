const mongoose = require('mongoose');
const generateToken = require('../helpers/generateToken');

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    userToken: {
        type: String,
        default: generateToken.generateToken(20),
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;