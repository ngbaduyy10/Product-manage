const productRoutes = require('./product.route');
const homeRoutes = require('./home.route');
const cartRoutes = require('./cart.route');
const categoryMiddleware = require('../../middleware/admin/category.middleware');
const cartMiddleware = require('../../middleware/client/cart.middleware');

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.createCart);

    app.use('/', homeRoutes);

    app.use('/products', productRoutes);

    app.use('/cart', cartRoutes);
}