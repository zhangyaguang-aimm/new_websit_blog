const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    power: {
        type: Number,
        default: 10
    }
})



const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel