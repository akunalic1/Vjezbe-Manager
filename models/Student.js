const Sequelize = require('sequelize')
const db = require('../db')
const Grupa = require('./Grupa')

const Student = db.define('student', {
    ime: {
        type: Sequelize.STRING
    },
    prezime: {
        type: Sequelize.STRING
    },
    index: {
        type: Sequelize.INTEGER
    },
    grupa: {
        type: Sequelize.STRING
    },
})


module.exports = Student
