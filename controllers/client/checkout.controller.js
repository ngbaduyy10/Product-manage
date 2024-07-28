const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const Order = require('../../models/order.model');

module.exports.index = async (req, res) => {
    const products = res.locals.cart.cartItems;
    for (let product of products) {
        const productDetail = await Product.findOne({_id: product.product_id});
        product.productDetail = productDetail
    }

    const totalPrice = products.reduce((total, product) => {
        return total + product.productDetail.price * product.quantity;
    }, 0);

    res.render('client/pages/checkout/index', {
        pageTitle: 'Checkout',
        products: products,
        totalPrice: totalPrice,
    });
}

module.exports.order = async (req, res) => {
    const cart = await Cart.findOne({_id: req.cookies.cartId});
    const products = cart.cartItems;
    let cartObjects = [];

    for (let product of products) {
        const productDetail = await Product.findOne({_id: product.product_id});
        cartObjects.push({
            product_id: product.product_id,
            price: productDetail.price,
            quantity: product.quantity
        });
    }

    const order = await new Order({
        cart_id: req.cookies.cartId,
        userInfo: req.body,
        cartItems: cartObjects,
    });
    await order.save();
    await Cart.updateOne({_id: req.cookies.cartId}, {cartItems: []});
    res.redirect(`/checkout/success/${order.id}`);
}

module.exports.success = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findOne({_id: id});
    for (let product of order.cartItems) {
        const productDetail = await Product.findOne({_id: product.product_id}).select('title thumbnail');
        product.productDetail = productDetail;
    }

    order.totalQuantity = order.cartItems.reduce((total, product) => {
        return total + product.quantity;
    }, 0);
    order.totalPrice = order.cartItems.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);

    res.render('client/pages/checkout/success', {
        pageTitle: 'Order Success',
        order: order,
    });
}