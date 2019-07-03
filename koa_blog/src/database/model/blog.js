const mongoose = require('mongoose')

const Schema = mongoose.Schema


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    author: Schema.ObjectId,
    tags: [{
        type: Schema.ObjectId,
        ref: 'tags'
    }],
    isShow: {
        type: Boolean,
        default: true
    },
    modeifyAt: {
        type: Date,
        default: Date.now()
    },
    clickNum: {
        type: Number,
        default: 0
    },
    imgUrl: String,
    power: {
        type: Number,
        default: 0
    },
    isTop: {
        type: Boolean,
        default: false
    }
})

const BlogModel = mongoose.model('Blogs', blogSchema)

module.exports = BlogModel