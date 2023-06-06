module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.TEXT,
            },
            role: {
                type: Sequelize.DataTypes.STRING,
            },
        }, {
            timestamps: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
