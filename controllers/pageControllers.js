const path = require("path")

const pageControllers = {

	home: (req, res) => {
		res.sendFile(path.join(__dirname, "..", "views/index.html")) 
	
	},
	productos: (req, res) => {
		res.sendFile(path.join(__dirname, "..", "views/productos.html"))
	}
}

module.exports = pageControllers