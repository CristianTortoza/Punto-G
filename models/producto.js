const Sequelize = require("sequelize")
const database = require("../config/database")

const Producto = database.define("producto",{
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	titulo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	marca: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	precio: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	imagen:{
		type: Sequelize.STRING,
		allowNull: false,
	},
})

module.exports = Producto