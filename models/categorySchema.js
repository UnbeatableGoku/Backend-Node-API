const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A categoru must have title']
    },
    is_active: {
        type: Boolean,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    other_description: {
        type: String
    }
})

const category = mongoose.model('Category', CategorySchema)

module.exports = category