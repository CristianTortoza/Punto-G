const path = require("path")
const bcryptjs = require('bcryptjs')
const Producto = require("../models/producto")
const Usuario = require("../models/usuario")

const pageControllers = {

	home: async (req,res) => {
		const producto = await Producto.find()
		res.render('index', {
			title: 'Welcome!',
			producto,
			loggedIn : req.session.loggedIn,
			userId: req.session._id,
			nombre: null || req.session.nombre
		})
	},
	crearCuenta:(req,res) => {
		res.render('crearCuenta', {
			title: 'Crear Cuenta',
			loggedIn : req.session.loggedIn,
			userId: req.session._id ,
		})
	},
	ingresar:(req,res) => {
		res.render('ingresar', {
			title: 'Iniciar sesion',
			error: null,	
			loggedIn : req.session.loggedIn,
			userId: req.session._id ,
		})
	},
	admin:(req,res) => {
		res.render('admin', {
			title: 'Cargar-Producto',
			editando: false,
			loggedIn : req.session.loggedIn,
			userId: req.session._id ,
		})
	},
	crearProducto: async (req, res) => {
		console.log(req.params._id)
		const {titulo, precio, imagen, descripcion, _id} = req.body
		let productoNuevo 
		if(!_id){
			productoNuevo = await new Producto({
				titulo,
				precio,
				imagen,
				descripcion,
				userId: req.params._id
			})
		}else{
			productoNuevo = await Producto.findOne({_id})
			productoNuevo.titulo = titulo
			productoNuevo.precio = precio
			productoNuevo.imagen = imagen
			productoNuevo.descripcion = descripcion	
			productoNuevo.userId = req.params._id
		}
		try{
			await productoNuevo.save()
			res.redirect("/")
		}catch(e){
			console.log(e)
		}
	},

	eliminarProducto: async (req, res) => {
		await Producto.findByIdAndDelete({_id: req.params._id})
		res.redirect("/")
	},

	editarProducto: async (req, res) => {
		const producto = await Producto.findOne({_id: req.params._id})
		res.render('admin', {
			title: 'Editar-Producto',
			editando: producto,
			loggedIn : req.session.loggedIn,
			userId: req.session._id ,
		})
	},

	cargarUsuario: async (req,res) => { 
		const {nombre, email, contrasena} = req.body
		let cryptPass = bcryptjs.hashSync(contrasena)
		let nuevoUsuario = new Usuario({
			nombre,
			email,
			contrasena: cryptPass,		
		})
		try{
			await nuevoUsuario.save()
			res.redirect("/ingresar")
		}catch(e){
			console.log(e)
		}
	},

	ingresarCuenta: async (req,res) => {
		const {email, contrasena} = req.body
		let usuario = await Usuario.findOne({email})
		let correctPass = bcryptjs.compareSync(contrasena, usuario.contrasena)
		if(!usuario || !correctPass){
			res.render('ingresar', {
				title: 'Iniciar sesion',
				error: "contrasena o mail incorrecto"
			})
		}
		req.session.loggedIn = true
		req.session._id = usuario._id
		req.session.nombre = usuario.nombre
		return res.redirect("/")
	},
	desconectarUsuario: (req, res) => {
		req.session.destroy(() =>{
			res.redirect("/")
		})
	}
}

module.exports = pageControllers