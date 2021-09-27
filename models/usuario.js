const Sequelize = require("sequelize")
const database = require("../config/database")

const Usuario = database.define("usuario",{
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	nombre: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	contrasena: {
		type: Sequelize.STRING,
		allowNull: false
	}

})

module.exports = Usuario