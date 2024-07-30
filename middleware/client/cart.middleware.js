const Cart = require('../../models/cart.model');

module.exports.createCart = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const cart = await new Cart();
        await cart.save();
        await res.cookie('cartId', cart.id, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
        });
    } else {
        const cart = await Cart.findOne({ _id: req.cookies.cartId });
        const cartQuantity = cart.cartItems.reduce((total, item) => total + item.quantity, 0);
        cart.totalQuantity = cartQuantity;
        res.locals.cart = cart;
    }
    next();
}