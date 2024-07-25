const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    productCategory: {
        type: String,
        default: '',
    },
    price: Number,
    discountPercentage: Number,
    thumbnail: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date,
        }
    ],
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema, 'product');

module.exports = Product;