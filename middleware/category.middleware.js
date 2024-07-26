const Category = require('../models/category.model');
const createTree = require('../helpers/createTree');

module.exports.category = async (req, res, next) => {
    const category = await Category.find({ deleted: false });
    const categoryTree = createTree.tree(category);
    res.locals.categoryTree = categoryTree;
    next();
}