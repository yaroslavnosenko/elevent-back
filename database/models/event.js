module.exports = (sequelize, DataTypes) => {
    return sequelize.define('events', {
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
        img_url: {
            allowNull:false,
            type: DataTypes.STRING,
            unique: false,
            validate:{
                notEmpty: true
            }
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        start_date: {
            allowNull: false,
            type: DataTypes.DATE,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        end_date: {
            allowNull: false,
            type: DataTypes.DATE,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        site: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        hash: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        }
    });
};
