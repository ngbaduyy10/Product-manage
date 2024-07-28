module.exports.register = async (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Name is required!');
        res.redirect('back');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Email is required!');
        res.redirect('back');
        return;
    }
    if (!req.body.phone) {
        req.flash('error', 'Phone is required!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Password is required!');
        res.redirect('back');
        return;
    }
    next();
}

module.exports.login = async (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Email is required!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Password is required!');
        res.redirect('back');
        return;
    }
    next();
}

module.exports.forgotPassword = async (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Email is required!');
        res.redirect('back');
        return;
    }
    next();
}

module.exports.otp = async (req, res, next) => {
    if (!req.body.otp) {
        req.flash('error', 'OTP is required!');
        res.redirect('back');
        return;
    }
    next();
}