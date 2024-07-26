const Role = require('../../models/roles.model');
const Account = require("../../models/account.model");
const md5 = require("md5");

module.exports.index = (req, res) => {
    res.render('./admin/pages/myAccount/index', {
        pageTitle: 'My Account',
    });
}

module.exports.edit = async (req, res) => {
    const roles = await Role.find({}).select('title permissions');

    res.render('./admin/pages/myAccount/edit', {
        pageTitle: 'Edit My Account',
        roles: roles,
    });
}

module.exports.editPatch = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        _id: { $ne: res.locals.user.id },
        deleted: false,
    });
    if (emailExist) {
        req.flash('error', 'Email already exist!');
        res.redirect(`/admin/my-account/edit`);
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            req.body.password = res.locals.user.password;
        }
        await Account.updateOne({ _id: res.locals.user.id }, req.body);
        req.flash('info', 'Edit account successfully!');
        res.redirect('/admin/my-account');
    }
}