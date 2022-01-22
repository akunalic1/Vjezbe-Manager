const Sequelize = require('sequelize')
const db = require('../db')

const Zadatak = db.define('zadatak', {
    naziv: {
        type: Sequelize.STRING
    },
    vjezbaId: {
        type: Sequelize.STRING
    }
})

module.exports = Zadatak
