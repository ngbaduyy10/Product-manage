const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
const rolesRoutes = require('./roles.route');

module.exports = (app) => {
    app.use('/admin/dashboard', dashboardRoutes);

    app.use('/admin/products', productRoutes);

    app.use('/admin/category', categoryRoutes);

    app.use('/admin/roles', rolesRoutes);
}