module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_bios', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'users',
                    },
                    key: 'id'
                },
            },
            first_name: {
                type: Sequelize.DataTypes.STRING,
            },
            last_name: {
                type: Sequelize.DataTypes.STRING,
            },
            hobby: {
                type: Sequelize.DataTypes.STRING,
            },
        }, {
            timestamps: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_bios');
    },
};
