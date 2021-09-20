const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
	nombre: String,
	email: String,
	contrasena: String,
})

const Usuario = mongoose.model('usuario', usuarioSchema)

module.exports = Usuario