const mongoose = require('mongoose')
const configDb = require('../../config/config').db


module.exports = function(){
    mongoose.connect(configDb.url)

    mongoose.connection.on('connected', () => {
        console.log(`Mongondb connection open to db`)
    })

    mongoose.connection.on('error', function(err){
        console.log(`Mongodb connection error ${err}`)
    })

    mongoose.connection.on('disconnected', function(){
        console.log(`Mongodb connection disconnected`)
    })
}