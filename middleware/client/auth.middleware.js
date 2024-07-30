const User = require('../../models/user.model');

module.exports.authRequired = async (req, res, next) => {
    if (!req.cookies.userToken) {
        res.redirect('/user/login');
    } else {
        const user = await User.findOne({ userToken: req.cookies.userToken }).select('-password');
        if (!user) {
            res.redirect('/user/login');
        } else {
            res.locals.user = user;
            next();
        }
    }
}