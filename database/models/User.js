const { Model, DataTypes } = require("sequelize");

function UserModel(sequelize) {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
        },
        role: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false,
    });

    return User;
}

module.exports = UserModel;
