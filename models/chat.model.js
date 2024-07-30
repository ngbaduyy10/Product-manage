const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user_id: String,
    room_id: String,
    message: String,
    image: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true,
})

const Chat = mongoose.model('Chat', chatSchema, 'chat');

module.exports = Chat;