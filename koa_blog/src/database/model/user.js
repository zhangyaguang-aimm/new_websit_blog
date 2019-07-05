const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    modifyAt: {
        type: Date,
        default: Date.now()
    },
    power: {
        type: Number,
        default: 0
    },
    email: String,
    telphone: Number,
    loginCount: {
        type: Number,
        default: 0
    },
    realName: String,
    imgUrl: String,
    desc: String,
    github: String,
    SF: String,
    jueJin: String,
    interest: String,
    introduction: String
})



const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel