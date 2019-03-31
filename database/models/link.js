module.exports = (sequelize, DataTypes) => {
    return sequelize.define('links', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        social: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
    });
};
