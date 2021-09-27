const express = require("express")
const router = require("./routes/index")
const session = require("express-session")
const Sequelize = require("sequelize")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const database = require("./config/database")
const Usuario = require("./models/Usuario")
const Producto = require("./models/Producto")



const myStore = new SequelizeStore({
	db: database
})
const rutasControllers = require("./controllers/rutasControllers")
require("dotenv").config()
require("./config/database")
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

Producto.belongsTo(Usuario)
Usuario.hasMany(Producto)

app.use(session({
	secret: process.env.FRASESE,
	store: myStore,
	resave: false,
	saveUninitialized: false,
	proxy: true,
}))
myStore.sync()




database.sync()
.then(()=>{
	app.use("/",rutasControllers.controladorDeRutas, router)
	app.listen(4000)
})