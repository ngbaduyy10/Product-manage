const uploadToCloud = require("../../helpers/uploadToCloud");
const Chat = require("../../models/chat.model");

module.exports = async (res) => {
    const userId = res.locals.user.id;
    const userName = res.locals.user.fullName;

    _io.once('connection', (socket) => {
        socket.on('CLIENT_SEND_MASSAGE', async (data) => {
            let images = [];
            if (data.images) {
                for (let image of data.images) {
                    const result = await uploadToCloud.upload(image);
                    images.push(result);
                }
            }

            const chat = await new Chat({
                user_id: userId,
                message: data.message,
                images: images,
            });
            await chat.save();

            _io.emit('SERVER_RETURN_MASSAGE', {
                user_id: userId,
                userName: userName,
                message: data.message,
                images: images,
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
}