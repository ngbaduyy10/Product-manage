const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');
const chatSocket = require('../../sockets/client/chat.socket');

module.exports.index = async (req, res) => {
    await chatSocket(res);

    const chats = await Chat.find({});
    for (let chat of chats) {
        const user = await User.findOne({_id: chat.user_id}).select('fullName');
        chat.userName = user.fullName;
    }

    res.render('client/pages/chat/index', {
        pageTitle: 'Chat',
        chats: chats,
    });
}