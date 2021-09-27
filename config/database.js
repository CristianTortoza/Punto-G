const Sequelize = require('sequelize')
const database = new Sequelize('sexshop', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = database