const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');

module.exports = (app) => {
    app.use('/admin/dashboard', dashboardRoutes);

    app.use('/admin/products', productRoutes);

    app.use('/admin/category', categoryRoutes);
}