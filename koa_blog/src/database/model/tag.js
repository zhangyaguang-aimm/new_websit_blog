const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})


const TagModel = mongoose.model('Tags', tagSchema)


module.exports = TagModel