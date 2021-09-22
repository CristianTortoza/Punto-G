const path = require("path")
const bcryptjs = require('bcryptjs')
const Producto = require("../models/producto")
const Usuario = require("../models/usuario")

const pageControllers = {

	home: async (req,res) => {
		const producto = await Producto.find()
		return res.render('index', {
			title: 'Welcome!',
			producto,
			loggedIn : req.session.loggedIn,
			userId: req.session._id,
			nombre: null || req.session.nombre
		})
	},
	crearCuenta:(req,res) => {
	
		try {
			if(req.session.loggedIn) throw new Error()
			return	res.render('crearCuenta', {
				title: 'Crear Cuenta',
				loggedIn : req.session.loggedIn,
				userId: req.session._id ,
				error: null,
			})
		}catch(e){
			console.log(e)
			res.redirect("/")
		}
	},
	ingresar:(req,res) => {
	
		try{
			if(req.session.loggedIn) throw new Error()
			return	res.render('ingresar', {
				title: 'Iniciar sesion',
				error: null,	
				loggedIn : req.session.loggedIn,
				userId: req.session._id ,
			})
		}	
		catch(e){
			console.log(e)
			res.redirect("/")
		}
	},
	admin:(req,res) => {
		
		try{	
			if(!req.session.loggedIn) throw new Error()
			return res.render('admin', {
				title: 'Cargar-Producto',
				editando: false,
				loggedIn : req.session.loggedIn,
				userId: req.session._id ,
			})
		}
		catch(e){
			console.log(e)
			res.redirect("/")
		}
	},
	crearProducto: async (req, res) => {
		const {titulo, precio, imagen,estrellas, marca, _id} = req.body
		console.log(req.body.estrellas)
		let productoNuevo 
		if(!_id){
			productoNuevo = await new Producto({
				titulo,
				marca,
				precio,
				imagen,
				estrellas,
				userId: req.params._id
			})
		}else{
			productoNuevo = await Producto.findOne({_id})
			productoNuevo.titulo = titulo
			productoNuevo.precio = precio
			productoNuevo.imagen = imagen
			productoNuevo.marca = marca
			productoNuevo.estrellas = estrellas
			productoNuevo.userId = req.params._id
		}
		try{
			await productoNuevo.save()
			res.redirect("/")
		}catch(e){
			console.log(e)
			res.redirect("/")
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
		let usuario = await Usuario.findOne({email})
		if(usuario){
			return res.render('crearCuenta', {
				title: 'Crear cuenta',
				error: "El usuario ya existe",
				loggedIn : false,
			})
		}
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
		try{
			const {email, contrasena} = req.body
			let usuario = await Usuario.findOne({email})
			let correctPass = bcryptjs.compareSync(contrasena, usuario.contrasena)
			if(!usuario || !correctPass) throw new Error()
			req.session.loggedIn = true
			req.session._id = usuario._id
			req.session.nombre = usuario.nombre
			res.redirect("/")
		}catch(e){
			res.render('ingresar', {
				title: 'ingresar',
				error: "contraseña o mail incorrecto",
				loggedIn : false,
			})
		}

	},




	desconectarUsuario: (req, res) => {
		req.session.destroy(() =>{
			res.redirect("/")
		})
	}
}

module.exports = pageControllers