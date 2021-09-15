const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO)
.then(() => console.log("Database connected"))
.catch(e => console.log(e))