'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderItems', {
            orderitem_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            item_id: {
                allowNull: false,
                references: {
                    model: 'Items',
                    key: 'item_id',
                },
                onDelete: 'CASCADE',
                type: Sequelize.BIGINT,
            },
            amount: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            state: {
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
        await queryInterface.dropTable('OrderItems');
    },
};
