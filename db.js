const { Sequelize } = require('sequelize');

const db = new Sequelize('wt2118770', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  
});

//db.sync({ force: true });

module.exports = db
