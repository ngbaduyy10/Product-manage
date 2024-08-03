const mongoose = require('mongoose');

const roomChatSchema = new mongoose.Schema({
    title: String,
    roomType: String,
    members: [
        {
            user_id: String,
            role: String,
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const RoomChat = mongoose.model('RoomChat', roomChatSchema, 'room-chat');

module.exports = RoomChat;