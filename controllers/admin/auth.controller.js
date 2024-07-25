const Account = require('../../models/account.model');
const md5 = require('md5');

module.exports.login = async (req, res) => {
    if (req.cookies.token) {
        const user = await Account.findOne({ token: req.cookies.token });
        if (user) {
            res.redirect('/admin/dashboard');
        }
    }
    res.render('admin/pages/auth/login', {
        pageTitle: 'Login'
    })
}

module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    const account = await Account.findOne({ email: email, deleted: false });

    if (!account) {
        req.flash('error', 'Email does not exist');
        res.redirect("back");
    } else if (account.password !== md5(password)) {
        req.flash('error', 'Password is incorrect');
        res.redirect("back");
    } else {
        res.cookie("token", account.token);
        res.redirect('/admin/dashboard');
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/auth/login');
}