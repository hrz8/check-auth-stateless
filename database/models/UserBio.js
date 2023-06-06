const { Model, DataTypes } = require("sequelize");

function UserBioModel(sequelize) {
    class UserBio extends Model {}

    UserBio.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'users',
                },
                key: 'id'
            },
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        hobby: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: 'user_bios',
        timestamps: false,
    });

    return UserBio;
}

module.exports = UserBioModel;
