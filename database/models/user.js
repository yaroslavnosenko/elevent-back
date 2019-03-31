module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profile_url: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        uid: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        photo_url: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        display_name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        summary: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        bio: {
            allowNull: true,
            type: DataTypes.STRING
        }
    });
};
