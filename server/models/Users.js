module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users",{
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
        gender:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        course:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        permission:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        token:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Users;
}