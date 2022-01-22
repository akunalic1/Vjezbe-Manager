const Sequelize = require('sequelize')
const db = require('../db')

const Vjezba = db.define('vjezba', {
    naziv: {
        type: Sequelize.STRING
    },
    grupa: {
        type: Sequelize.STRING
    },
    studentId: {
        type: Sequelize.INTEGER
    }
})

module.exports = Vjezba
