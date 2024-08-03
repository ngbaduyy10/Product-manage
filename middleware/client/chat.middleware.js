const RoomChat = require('../../models/roomChat.model');

module.exports.accessRoom = async (req, res, next) => {
    const userId = res.locals.user.id;
    const roomChatId = req.params.roomChatId;

    try {
        const roomChat = await RoomChat.findOne({
            _id: roomChatId,
            'members.user_id': userId,
            deleted: false,
        });
        if (!roomChat) {
            res.redirect('/');
        } else {
            next();
        }
    } catch(error) {
        res.redirect('/');
    }
}