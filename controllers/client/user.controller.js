const User = require('../../models/user.model');
const md5 = require('md5');

module.exports.register = async (req, res) => {
    res.render('client/pages/user/register', {
        pageTitle: 'Register',
    });
}

module.exports.registerPost = async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        req.flash('error', 'Email already exist!');
        res.redirect('/user/register');
    } else {
        req.body.password = md5(req.body.password);
        const user = await new User(req.body);
        await user.save();
        res.cookie('userToken', user.userToken)
        req.flash('info', 'Register successfully!');
        res.redirect('/');
    }
}

module.exports.login = async (req, res) => {
    res.render('client/pages/user/login', {
        pageTitle: 'Login',
    });
}

module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email});
    if (!user) {
        req.flash('error', 'Email does not exist');
        res.redirect('/user/login');
    } else if (user.password !== md5(password)) {
        req.flash('error', 'Password is incorrect');
        res.redirect('/user/login');
    } else {
        res.cookie('userToken', user.userToken);
        res.redirect('/');
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/');
}