const productRoutes = require('./product.route');
const homeRoutes = require('./home.route');
const cartRoutes = require('./cart.route');
const checkoutRoutes = require('./checkout.route');
const userRoutes = require('./user.route');
const categoryMiddleware = require('../../middleware/admin/category.middleware');
const cartMiddleware = require('../../middleware/client/cart.middleware');
const userMiddleware = require('../../middleware/client/user.middleware');

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.createCart);
    app.use(userMiddleware.infoUser);

    app.use('/', homeRoutes);

    app.use('/products', productRoutes);

    app.use('/cart', cartRoutes);

    app.use('/checkout', checkoutRoutes);

    app.use('/user', userRoutes);
}