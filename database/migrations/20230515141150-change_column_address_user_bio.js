module.exports = {
    async up(queryInterface, { DataTypes }) {
        await queryInterface.changeColumn('user_bios', 'address', {
            type: DataTypes.STRING,
        });
    },

    async down(queryInterface, { DataTypes }) {
        await queryInterface.changeColumn('user_bios', 'address', {
            type: DataTypes.TEXT,
        });
    }
};
