const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String,
    },
    cartItems: [
        {
            product_id: String,
            price: Number,
            quantity: Number,
        },
    ],
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema, 'order');

module.exports = Order;