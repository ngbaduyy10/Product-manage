const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');

module.exports.addPost = async (req, res) => {
    const cart = await Cart.findOne({ _id: req.cookies.cartId });
    const existProduct = cart.cartItems.find(item => item.product_id == req.params.id);

    if (existProduct) {
        const newQuantity = existProduct.quantity + parseInt(req.body.quantity);
        await Cart.updateOne({ _id: req.cookies.cartId, 'cartItems.product_id': req.params.id }, { $set: { 'cartItems.$.quantity': newQuantity } });
    } else {
        const cartId = req.cookies.cartId;
        const cartObject = {
            product_id: req.params.id,
            quantity: parseInt(req.body.quantity),
        }

        await Cart.updateOne({ _id: cartId }, { $push: { cartItems: cartObject } });
    }
    req.flash('info', 'Add product to cart successfully!');
    res.redirect('back');
}

module.exports.index = async (req, res) => {
    const products = res.locals.cart.cartItems;
    for (let product of products) {
        const productDetail = await Product.findOne({_id: product.product_id});
        product.productDetail = productDetail
    }
    const totalPrice = products.reduce((total, product) => {
        return total + product.productDetail.price * product.quantity;
    }, 0);

    res.render('client/pages/cart/index', {
        pageTitle: 'Cart',
        products: products,
        totalPrice: totalPrice
    })
}

module.exports.delete = async (req, res) => {
    await Cart.updateOne({ _id: req.cookies.cartId }, { $pull: { cartItems: { product_id: req.params.id } } });
    req.flash('info', 'Remove product from cart successfully!');
    res.redirect('back');
}

module.exports.update = async (req, res) => {
    await Cart.updateOne({ _id: req.cookies.cartId, 'cartItems.product_id': req.params.id }, { $set: { 'cartItems.$.quantity': req.query.quantity } });
    res.redirect('back');
}