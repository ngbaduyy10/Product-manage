const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');

module.exports = (app) => {
    app.use('/admin/dashboard', dashboardRoutes);

    app.use('/admin/products', productRoutes);
}