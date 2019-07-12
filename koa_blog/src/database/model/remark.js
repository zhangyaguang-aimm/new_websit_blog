const mongoose = require('mongoose')

const Schema = mongoose.Schema

const remarkShema = new Schema({
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
    blogId: String,
    zone: String, // 判断是不是在讨论区的
    replys: [{
        type: Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    guestInfo: Object,
    likes: {
        type: Number,
        default: 0
    }
})


const RemarkShema = mongoose.model('Remark', remarkShema)

module.exports = RemarkShema