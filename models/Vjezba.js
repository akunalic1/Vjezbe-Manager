const Sequelize = require('sequelize')
const db = require('../db')
const Grupa = require('./Grupa')
const Zadatak = require('./Zadatak')

const Vjezba = db.define('vjezba', {
    naziv: {
        type: Sequelize.STRING
    },
    brojZadataka: {
        type: Sequelize.INTEGER
    }
},{timestamps: false})

module.exports = Vjezba
