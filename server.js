const express = require("express")
const router = require("./routes/index")
require("dotenv").config()
require("./config/database")


const app = express()
app.use(express.static("public"))
app.use("/", router)

app.listen(4000, () => console.log("server on"))