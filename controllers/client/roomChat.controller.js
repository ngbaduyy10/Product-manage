const User = require('../../models/user.model');
const RoomChat = require('../../models/roomChat.model');

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const roomChat = await RoomChat.find({
        'members.user_id': userId,
        deleted: false,
    });

    res.render('client/pages/roomChat/index', {
        pageTitle: 'Room Chat',
        roomChat: roomChat
    });
}

module.exports.create = async (req, res) => {
    const friendList = res.locals.user.friendList;
    const friendListId = friendList.map(friend => friend.user_id);
    const friends = await User.find({_id: {$in: friendListId}}).select('id fullName');

    res.render('client/pages/roomChat/create', {
        pageTitle: 'Create Room Chat',
        friends: friends
    });
}

module.exports.createPost = async (req, res) => {
    const { title, membersId } = req.body;
    const userId = res.locals.user.id;
    const dataChat = {
        title: title,
        roomType: 'group',
        members: [],
    };
    dataChat.members.push({
        user_id: userId,
        role: 'admin',
    });
    membersId.forEach(memberId => {
        dataChat.members.push({
            user_id: memberId,
            role: 'member',
        });
    });
    const newChat = await new RoomChat(dataChat);
    await newChat.save();
    res.redirect(`/chat/${newChat._id}`);
}