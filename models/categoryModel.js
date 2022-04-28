const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, required: [true, 'A category must have title'] },
    image: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    other_description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);