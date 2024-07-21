const Category = require('../../models/category.model');

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const createTree = (data, parentId = '') => {
        let tree = [];
        let category = data.filter(item => item.parentId === parentId);
        if (category.length > 0) {
            category.forEach(item => {
                let children = createTree(data, item.id);
                if (children.length > 0) {
                    item.children = children;
                }
                tree.push(item);
            });
        }
        return tree;
    }

    const category = await Category.find(find);
    const tree = createTree(category);

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

    const createTree = (data, parentId = '') => {
        let tree = [];
        let category = data.filter(item => item.parentId === parentId);
        if (category.length > 0) {
            category.forEach(item => {
                let children = createTree(data, item.id);
                if (children.length > 0) {
                    item.children = children;
                }
                tree.push(item);
            });
        }
        return tree;
    }

    const category = await Category.find(find);
    const tree = createTree(category);

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