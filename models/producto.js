const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
	titulo: String,
	precio: Number,
	imagen: String,
	descripcion: String,
	userId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})

const Producto = mongoose.model('producto', productoSchema)

module.exports = Producto