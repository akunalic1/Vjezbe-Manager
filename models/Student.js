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
Student.hasOne(Grupa, {as:'grupaa', 
onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
foreignKey: 'student_pk' });
Grupa.belongsTo(Student, {foreignKey: 'student_pk' });

module.exports = Student
