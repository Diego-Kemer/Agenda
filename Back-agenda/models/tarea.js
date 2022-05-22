const {model, Schema} = require('mongoose')

const tarea = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String},
    hora: {type: String, required: true},
    nameUser: {type: String, required: true},
    activo: {type: Boolean, default: false}
})

module.exports = model('tarea', tarea)