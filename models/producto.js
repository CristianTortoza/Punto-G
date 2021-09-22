const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
	titulo: String,
	marca: String,
	precio: Number,
	imagen: String,
	estrellas: Number,
	userId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})

const Producto = mongoose.model('producto', productoSchema)

module.exports = Producto