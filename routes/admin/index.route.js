const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
const rolesRoutes = require('./roles.route');
const accountRoutes = require('./account.route');
const authRoutes = require('./auth.route');
const myAccountRoutes = require('./myAccount.route');
const authMiddleware = require('../../middleware/auth.middleware');

module.exports = (app) => {
    app.use('/admin/dashboard', authMiddleware.authRequired, dashboardRoutes);

    app.use('/admin/products', authMiddleware.authRequired, productRoutes);

    app.use('/admin/category', authMiddleware.authRequired, categoryRoutes);

    app.use('/admin/roles', authMiddleware.authRequired, rolesRoutes);

    app.use('/admin/account', authMiddleware.authRequired, accountRoutes);

    app.use('/admin/my-account', authMiddleware.authRequired, myAccountRoutes);

    app.use('/admin/auth', authRoutes);
}