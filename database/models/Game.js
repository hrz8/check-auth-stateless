const { Model, DataTypes } = require("sequelize");

function GameModel(sequelize) {
    class Game extends Model {}

    Game.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        tableName: 'games',
        timestamps: false,
    });

    return Game;
}

module.exports = GameModel;
