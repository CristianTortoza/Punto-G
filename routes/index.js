const express = require("express")
const router = express.Router()
const pageControllers = require("../controllers/pageControllers")

router.route("/")
.get(pageControllers.home)

router.route("/productos/:id")
.post(pageControllers.crearProducto)

router.route("/admin")
.get(pageControllers.admin)

router.route("/eliminar-producto/:id")
.get(pageControllers.eliminarProducto)

router.route("/editar-producto/:id")
.get(pageControllers.editarProducto)
module.exports = router

router.route("/crearCuenta")
.get(pageControllers.crearCuenta)
.post(pageControllers.cargarUsuario)

router.route("/ingresar")
.get(pageControllers.ingresar)
.post(pageControllers.ingresarCuenta)

router.route("/desconectar")
.get(pageControllers.desconectarUsuario)