const Batch = require('./Batch');

module.exports = (sequelize, DataTypes) =>{
    const Course = sequelize.define("Course",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        course:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        department:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Course
}