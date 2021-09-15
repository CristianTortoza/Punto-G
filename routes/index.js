const express = require("express")
const router = express.Router()
const pageControllers = require("../controllers/pageControllers")

router.route("/")
.get(pageControllers.home)

router.route("/productos")
.get(pageControllers.productos)


module.exports = router