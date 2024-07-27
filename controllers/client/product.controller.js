const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const { getSub } = require('../../helpers/categoryHelper');

module.exports.index = async (req, res) => {
    let find = {};

    if (req.query.keyword) {
        const title = new RegExp(req.query.keyword, 'i');
        find = { title: title };
    }

    const products = await Product.find(find).sort({ createdAt: -1 })

    res.render('./client/pages/products/index', {
        pageTitle: 'Products',
        products: products,
        keyword: req.query.keyword,
    });
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug: slug });
    res.render('./client/pages/products/detail', {
        pageTitle: 'Product detail',
        product: product,
    })
}

module.exports.category = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug, deleted: false });
    const allSubs = await getSub(category.id);
    const allSubsId = allSubs.map((sub) => sub.id);

    const products = await Product.find({
        productCategory: { $in: [category.id, ...allSubsId] },
        deleted: false,
    }).sort({ createdAt: -1 });

    res.render('./client/pages/products/index', {
        pageTitle: `${category.title}`,
        products: products,
    });
}