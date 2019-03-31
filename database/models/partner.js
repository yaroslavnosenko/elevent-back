module.exports = (sequelize, DataTypes) => {
    return sequelize.define('partners', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        img_url:{
            allowNull:false,
            type: DataTypes.STRING,
            unique: false,
            validate:{
                notEmpty: true
            }
        }
    });
};
