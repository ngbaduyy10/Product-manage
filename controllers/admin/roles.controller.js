const Roles = require('../../models/roles.model');

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    const roles = await Roles.find(find);

    res.render('admin/pages/roles/index', {
        pageTitle: 'Roles',
        roles: roles,
    });
}

module.exports.create = (req, res) => {
    res.render('admin/pages/roles/create', {
        pageTitle: 'Create Role'
    });
}

module.exports.createPost = async (req, res) => {
    const roles = await new Roles(req.body);
    await roles.save();
    req.flash('info', 'Create success!');
    res.redirect('/admin/roles');
}

module.exports.edit = async (req, res) => {
    const role = await Roles.findById(req.params.id);
    res.render('admin/pages/roles/edit', {
        pageTitle: 'Edit Role',
        role: role
    });
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    await Roles.updateOne({_id: id}, req.body);
    req.flash('info', 'Edit success!');
    res.redirect('/admin/roles');
}