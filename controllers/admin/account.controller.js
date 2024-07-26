const Roles = require('../../models/roles.model');
const Account = require('../../models/account.model');
const md5 = require('md5');

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const accounts = await Account.find(find).select("-password -token");
    for (let item of accounts) {
        item.role = await Roles.findOne({ _id: item.role_id });
    }

    res.render('admin/pages/account/index', {
        pageTitle: 'Account',
        accounts: accounts,
    });
}

module.exports.create = async (req, res) => {
    const roles = await Roles.find({ deleted: false });

    res.render('admin/pages/account/create', {
        pageTitle: 'Create Account',
        roles: roles,
    });
}

module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({ email: req.body.email });
    if (emailExist) {
        req.flash('error', 'Email already exist!');
        res.redirect('/admin/account/create');
    } else {
        req.body.password = md5(req.body.password);
        const account = await new Account(req.body);
        await account.save();
        req.flash('info', 'Create account successfully!');
        res.redirect('/admin/account');
    }
}

module.exports.edit = async (req, res) => {
    const account = await Account.findOne({ _id: req.params.id });
    const roles = await Roles.find({ deleted: false });
    res.render('admin/pages/account/edit', {
        pageTitle: 'Edit Account',
        account: account,
        roles: roles,
    });
}

module.exports.editPatch = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
        deleted: false,
    });
    if (emailExist) {
        req.flash('error', 'Email already exist!');
        res.redirect(`/admin/account/edit/${req.params.id}`);
    } else {
        const account = await Account.findOne({ _id: req.params.id });
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            req.body.password = account.password;
        }
        await Account.updateOne({ _id: req.params.id }, req.body);
        req.flash('info', 'Update account successfully!');
        res.redirect('/admin/account');
    }
}