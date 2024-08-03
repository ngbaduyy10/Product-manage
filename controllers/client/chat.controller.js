const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');
const chatSocket = require('../../sockets/client/chat.socket');

module.exports.index = async (req, res) => {
    await chatSocket(req, res);

    const roomChatId = req.params.roomChatId;
    const chats = await Chat.find({room_id: roomChatId}).sort({createdAt: 1});
    for (let chat of chats) {
        const user = await User.findOne({_id: chat.user_id}).select('fullName');
        chat.userName = user.fullName;
    }

    res.render('client/pages/chat/index', {
        pageTitle: 'Chat',
        chats: chats,
    });
}