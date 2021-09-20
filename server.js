const express = require("express")
const router = require("./routes/index")
const session = require("express-session")
const mongo = require('connect-mongodb-session')(session)
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

app.use("/", router)
app.set('view engine', 'ejs')
app.listen(4000, () => console.log("server on"))