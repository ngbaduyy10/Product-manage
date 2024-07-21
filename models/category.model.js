const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
    title: String,
    parentId: String,
    description: String,
    thumbnail: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const Category = mongoose.model('Category', categorySchema, 'category');

module.exports = Category;