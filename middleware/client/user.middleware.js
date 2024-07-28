const User = require('../../models/user.model');

module.exports.loginCheck = async (req, res, next) => {
    if (req.cookies.userToken) {
        const user = await User.find({userToken: req.cookies.userToken}).select('-password');
        if (user) {
            res.redirect('/');
        }
    }
    next();
}

module.exports.infoUser = async (req, res, next) => {
    if (req.cookies.userToken) {
        const user = await User.findOne({userToken: req.cookies.userToken}).select('-password');
        if (user) {
            res.locals.user = user;
        }
    }
    next();
}