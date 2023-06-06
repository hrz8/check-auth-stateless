module.exports = {
    async up(queryInterface, { DataTypes }) {
        await queryInterface.addColumn('user_bios', 'address', {
            type: DataTypes.TEXT,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('user_bios', 'address');
    }
};
