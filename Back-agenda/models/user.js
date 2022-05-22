const {model, Schema} = require('mongoose')

const user = new Schema({
    nameUser: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = model('user', user)