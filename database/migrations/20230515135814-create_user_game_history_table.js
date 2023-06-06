
module.exports = {
    async up(queryInterface, { DataTypes }) {
        await queryInterface.createTable('user_game_histories', {
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
            game_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'games',
                    },
                    key: 'id'
                },
            },
            score: {
                type: DataTypes.INTEGER,
            },
            played_at: {
                type: DataTypes.DATE,
            },
        }, {
            timestamps: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_game_histories');
    },
};
