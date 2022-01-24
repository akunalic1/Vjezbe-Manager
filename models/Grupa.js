const Sequelize = require('sequelize')
const db = require('../db')
const Student = require('./Student')

const Grupa = db.define('grupa', {
    naziv: {
        type: Sequelize.STRING,
        unique:true
    }
})

module.exports = Grupa
