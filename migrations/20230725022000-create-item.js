'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Items', {
            item_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            option_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'Options',
                    key: 'option_id',
                },
                defaultValue: 0,
            },
            price: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            amount: {
                allowNull: false,
                type: Sequelize.BIGINT,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Items');
    },
};
