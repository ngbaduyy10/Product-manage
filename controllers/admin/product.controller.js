const Product = require('../../models/product.model');
const searchHelper = require('../../helpers/searchHelper');
const paginationHelper = require('../../helpers/paginationHelper');

module.exports.index = async (req, res) => {
    let find = {};

    if (req.query.keyword) {
        find.title = searchHelper(req.query);
    }

    const count = await Product.countDocuments(find);
    const pagination = paginationHelper({
        limit: 8,
        currentPage: parseInt(req.query.page) || 1,
    }, count);

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.createdAt = -1;
    }

    const products = await Product.find(find).limit(pagination.limit).skip(pagination.skip).sort(sort);

    res.render('./admin/pages/products/index', {
        pageTitle: 'Product',
        products: products,
        keyword: req.query.keyword,
        pagination: pagination
    });
}

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: true })
    req.flash('info', 'Delete success!');
    res.redirect("back");
}

module.exports.deleteMulti = async (req, res) => {
    const ids = req.body.id.split(", ");
    await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
    req.flash('info', 'Delete success!');
    res.redirect("back");
}

module.exports.create = (req, res) => {
    res.render('./admin/pages/products/create', {
        pageTitle: 'Create Product',
    });
}

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    const product = new Product(req.body);
    await product.save();
    req.flash('info', 'Create success!');
    res.redirect('/admin/products');
}

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    res.render('./admin/pages/products/edit', {
        pageTitle: 'Edit Product',
        product: product,
    });
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    if (req.file) {
        req.body.thumbnail = "/uploads/" + req.file.filename;
    }
    await Product.updateOne({ _id: id }, req.body);
    req.flash('info', 'Edit success!');
    res.redirect('/admin/products');
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug: slug});
    res.render('./admin/pages/products/detail', {
        pageTitle: 'Detail Product',
        product: product,
    });
}