const path = require("path")
const bcryptjs = require('bcryptjs')
const Producto = require("../models/producto")
const Usuario = require("../models/Usuario")

const pageControllers = {

	home: async (req,res) => {
		const producto = await Producto.findAll()
		return res.render('index', {
			title: 'Welcome!',
			producto,
			loggedIn : req.session.loggedIn,
			usuarioId: req.session.usuarioId,
			nombre: null || req.session.nombre
		})
	},

	crearCuenta:(req,res) => {
		try {
			if(req.session.loggedIn) throw new Error()
			return	res.render('crearCuenta', {
				title: 'Crear Cuenta',
				loggedIn : req.session.loggedIn,
				usuarioId: req.session.usuarioId ,
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
				usuarioId: req.session.usuarioId ,
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
				usuarioId: req.session.usuarioId ,
			})
		}
		catch(e){
			console.log(e)
			res.redirect("/")
		}
	},

	crearProducto: async (req, res) => {
		const {titulo, precio, imagen, marca, id} = req.body
		let productoNuevo;
		if(!id){
			productoNuevo = new Producto({
				usuarioId: req.session.usuarioId,
				titulo,
				marca,
				precio,
				imagen,	
			})
			await productoNuevo.save()
			res.redirect("/")
		}else{
			productoNuevo = await Producto.findOne({where:{id}})
			productoNuevo.titulo = titulo
			productoNuevo.precio = precio
			productoNuevo.imagen = imagen
			productoNuevo.usuarioId = req.session.usuarioId
			await productoNuevo.save()
			res.redirect("/")
		}
		
	},

	eliminarProducto: async (req, res) => {
		let productoAEliminar = await Producto.findByPk(req.params.id)
		await productoAEliminar.destroy()
		res.redirect("/")
	},

	editarProducto: async (req, res) => {
		const productoAeditar = await Producto.findByPk(req.params.id)
		res.render('admin', {
			title: 'Editar-Producto',
			editando: productoAeditar,
			loggedIn : req.session.loggedIn,
			usuarioId: req.session.usuarioId ,
		})
	},

	cargarUsuario: async (req,res) => { 
		const {nombre, email, contrasena} = req.body
		let cryptPass = bcryptjs.hashSync(contrasena)
		let usuario = await Usuario.findOne({where:{email}})
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
			let usuario = await Usuario.findOne({where:{email}})
			let correctPass = bcryptjs.compareSync(contrasena, usuario.contrasena)
			if(!usuario || !correctPass) throw new Error()
			req.session.loggedIn = true
			req.session.usuarioId = usuario.id
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