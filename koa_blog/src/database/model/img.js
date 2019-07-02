const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imgSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    modifyAt: {
        type: Date,
        default: Date.now()
    },
    author: Schema.ObjectId
})


const ImgModel = mongoose.model('Imgs',imgSchema)


module.exports = ImgModel