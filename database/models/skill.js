module.exports = (sequelize, DataTypes) => {
    return sequelize.define('skills', {
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
    });
};
