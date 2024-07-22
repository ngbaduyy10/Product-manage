const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const Roles = mongoose.model('Roles', rolesSchema, 'roles');

module.exports = Roles;