const Category = require('../../models/category.model');
const createTree = require('../../helpers/createTree');

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const category = await Category.find(find);
    const tree = createTree.tree(category);

    res.render('admin/pages/category/index', {
        pageTitle: 'Category',
        category: category,
        tree: tree,
    });
}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const category = await Category.find(find);
    const tree = createTree.tree(category);

    res.render('admin/pages/category/create', {
        pageTitle: 'Create category',
        category: category,
        tree: tree,
    });
}

module.exports.createPost = async (req, res) => {
    const category = await new Category(req.body);
    await category.save();
    req.flash('info', 'Create success!');
    res.redirect('/admin/category');
}

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const data = await Category.findOne({ _id: id, deleted: false });
    const category = await Category.find({ deleted: false });
    const tree = createTree.tree(category);

    res.render('admin/pages/category/edit', {
        pageTitle: 'Edit category',
        data: data,
        tree: tree,
    });
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    await Category.updateOne({ _id: id }, req.body);
    req.flash('info', 'Edit success!');
    res.redirect('/admin/category');
}