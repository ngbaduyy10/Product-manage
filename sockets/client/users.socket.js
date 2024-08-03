const User = require('../../models/user.model');

module.exports = async (res) => {
    const userId = res.locals.user.id;

    _io.once('connection', (socket) => {
        socket.on('CLIENT_ADD_FRIEND', async (friendId) => {
            const existAccept = await User.findOne({
                _id: friendId,
                acceptList: userId,
            });
            if (!existAccept) {
                await User.updateOne({_id: friendId}, {
                    $push: {acceptList: userId},
                });
            }

            const existRequest = await User.findOne({
                _id: userId,
                requestList: friendId,
            });
            if (!existRequest) {
                await User.updateOne({_id: userId}, {
                    $push: {requestList: friendId},
                });
            }

            const friend = await User.findOne({_id: friendId}).select('-password -userToken');
            const length = friend.acceptList.length;
            socket.broadcast.emit('SERVER_RETURN_LENGTH', {
                friendId: friendId,
                length: length,
            });

            const fullName = res.locals.user.fullName;
            socket.broadcast.emit('SERVER_RETURN_INFO', {
                friendId: friendId,
                fullName: fullName,
                userId: userId,
            });

            socket.broadcast.emit('SERVER_DELETE_INFO', {
                friendId: friendId,
                userId: userId,
            });
        });

        socket.on('CLIENT_CANCEL_ADD_FRIEND', async (friendId) => {
            const existAccept = await User.findOne({
                _id: friendId,
                acceptList: userId,
            });
            if (existAccept) {
                await User.updateOne({_id: friendId}, {
                    $pull: {acceptList: userId},
                });
            }

            const existRequest = await User.findOne({
                _id: userId,
                requestList: friendId,
            });
            if (existRequest) {
                await User.updateOne({_id: userId}, {
                    $pull: {requestList: friendId},
                });
            }

            const friend = await User.findOne({_id: friendId}).select('acceptList');
            const length = friend.acceptList.length;
            socket.broadcast.emit('SERVER_RETURN_LENGTH', {
                friendId: friendId,
                length: length,
            });

            socket.broadcast.emit('SERVER_DELETE_INFO', {
                friendId: friendId,
                userId: userId,
            });
        });

        socket.on('CLIENT_ACCEPT_FRIEND', async (friendId) => {
            const existAccept = await User.findOne({
                _id: userId,
                acceptList: friendId,
            });

            if (existAccept) {
                await User.updateOne({_id: userId}, {
                    $push: {
                        friendList: {
                            user_id: friendId,
                            room_id: '',
                        }
                    },
                    $pull: {acceptList: friendId},
                });
            }

            const existRequest = await User.findOne({
                _id: friendId,
                requestList: userId,
            });

            if (existRequest) {
                await User.updateOne({_id: friendId}, {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_id: '',
                        }
                    },
                    $pull: {requestList: userId},
                });
            }
        });

        socket.on('CLIENT_REGRET_FRIEND', async (friendId) => {
            const existAccept = await User.findOne({
                _id: userId,
                acceptList: friendId,
            });
            if (existAccept) {
                await User.updateOne({_id: userId}, {
                    $pull: {acceptList: friendId},
                });
            }

            const existRequest = await User.findOne({
                _id: friendId,
                requestList: userId,
            });
            if (existRequest) {
                await User.updateOne({_id: friendId}, {
                    $pull: {requestList: userId},
                });
            }
        });
    });
}