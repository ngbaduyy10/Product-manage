const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const userName = res.locals.user.fullName;

    _io.once('connection', (socket) => {
        socket.on('CLIENT_SEND_MASSAGE', async (message) => {
            const chat = await new Chat({
                user_id: userId,
                message: message,
            });
            await chat.save();

            _io.emit('SERVER_RETURN_MASSAGE', {
                user_id: userId,
                userName: userName,
                message: message,
            });
        });

        socket.on('CLIENT_SEND_TYPING', async (option) => {
           socket.broadcast.emit('SERVER_RETURN_TYPING', {
                user_id: userId,
                userName: userName,
                option: option,
           });
        });
    });

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