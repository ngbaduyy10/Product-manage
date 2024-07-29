const mongoose = require('mongoose');
const { generateOTP } = require('../helpers/generateToken');

const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: {
        type: String,
        default: generateOTP(6),
    },
    expireAt: {
        type: Date,
        default: Date.now(),
        expires: 120,
    },
}, {
    timestamps: true,
})

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, 'forgot-password');

module.exports = ForgotPassword;