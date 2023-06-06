module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('games', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
            },
            description: {
                type: Sequelize.DataTypes.STRING
            },
        }, {
            timestamps: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('games');
    },
};
