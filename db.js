const { Sequelize } = require('sequelize');

module.exports = new Sequelize('wt2118770', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});