const mongoose = require('mongoose')

const Schema = mongoose.Schema

const replySchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    remarkId: Schema.Types.ObjectId,
    guestInfo: Object,
    likes: {
        type: Number,
        default: 0
    }
})


const RemarkSchema = mongoose.model('Reply', replySchema)

module.exports = RemarkSchema