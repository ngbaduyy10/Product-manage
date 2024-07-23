const mongoose = require('mongoose');
const generateToken = require('../helpers/generateToken.js');

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generateToken.generateToken(20)
    },
    phone: String,
    role_id: String,
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const Account = mongoose.model('Account', accountSchema, 'account');

module.exports = Account;