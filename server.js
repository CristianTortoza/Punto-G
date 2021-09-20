const express = require("express")
const router = require("./routes/index")
const session = require("express-session")
const mongo = require('connect-mongodb-session')(session)
const rutasControllers = require("./controllers/rutasControllers")
require("dotenv").config()
require("./config/database")
const myStore = new mongo({
	uri: process.env.MONGO,
	collection: "sessions",
 })

const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(session({
	secret: process.env.FRASESE,
	resave: false,
	saveUninitialized: false,
	store: myStore,
}))

app.use("/",rutasControllers.controladorDeRutas, router)
app.set('view engine', 'ejs')
app.listen(process.env.PORT, process.env.HOST || '0.0.0.0', () => console.log("Server On"))