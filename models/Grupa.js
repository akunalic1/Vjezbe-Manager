const Sequelize = require('sequelize')
const db = require('../db')

const Grupa = db.define('grupa', {
    naziv: {
        type: Sequelize.STRING
    }
})

module.exports = Grupa
