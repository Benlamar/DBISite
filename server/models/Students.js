const Batch = require('./Batch');

module.exports = (sequelize, DataTypes) =>{
    const Students = sequelize.define("Students",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        f_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        m_name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        l_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        town_city:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        postal:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Students;
}