const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel