const uploadToCloud = require('../../helpers/uploadToCloud');

module.exports.uploadCloud = async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloud.upload(req.file.buffer);
        req.body[req.file.fieldname] = result;
    }
    next();
}