const User = require('../../models/user.model');
const usersSocket = require('../../sockets/client/users.socket');

module.exports.list = async (req, res) => {
    await usersSocket(res);

    const userId = res.locals.user.id;
    const myUser = await User.findById(userId).select('requestList acceptList friendList');
    const requestList = myUser.requestList;
    const acceptList = myUser.acceptList;
    const friendList = myUser.friendList.map(item => item.user_id);

    const users = await User.find({
        $and: [
            {_id: {$ne: userId}},
            {_id: {$nin: requestList}},
            {_id: {$nin: acceptList}},
            {_id: {$nin: friendList}},
        ],
        deleted: false,
    }).select('fullName');

    res.render('client/pages/users/list', {
        pageTitle: 'User List',
        users: users,
    });
}

module.exports.request = async (req, res) => {
    await usersSocket(res);

    const myId = res.locals.user.id;
    const user = await User.findById(myId).select('requestList');
    const requestList = user.requestList;
    const usersRequest = await User.find({
        _id: {$in: requestList},
        deleted: false,
    }).select('fullName');

    res.render('client/pages/users/request', {
        pageTitle: 'Request List',
        usersRequest: usersRequest,
    });
}

module.exports.accept = async (req, res) => {
    await usersSocket(res);

    const myId = res.locals.user.id;
    const user = await User.findById(myId).select('acceptList');
    const acceptList = user.acceptList;
    const usersAccept = await User.find({
        _id: {$in: acceptList},
        deleted: false,
    }).select('id fullName');

    res.render('client/pages/users/accept', {
        pageTitle: 'Accept List',
        usersAccept: usersAccept,
    })
}

module.exports.friend = async (req, res) => {
    const myId = res.locals.user.id;
    const myUser = await User.findById(myId).select('friendList');
    const friendListId = myUser.friendList.map(item => item.user_id);
    const users = await User.find({
        _id: {$in: friendListId},
        deleted: false,
    }).select('fullName statusOnline');

    users.forEach(user => {
        const infoUser = myUser.friendList.find(item => item.user_id === user.id);
        user.roomChatId = infoUser.room_id;
    })

    res.render('client/pages/users/friend', {
        pageTitle: 'Friend List',
        users: users,
    })
}