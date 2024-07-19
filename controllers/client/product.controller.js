const Product = require('../../models/product.model');

module.exports.index = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })

    res.render('./client/pages/products/index', {
        pageTitle: 'Products',
        products: products,
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