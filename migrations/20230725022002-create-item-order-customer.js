'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ItemOrderCustomers', {
            item_id: {
                allowNull: false,
                references: {
                    model: 'Items',
                    key: 'item_id',
                },
                type: Sequelize.BIGINT,
            },
            order_customer_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'OrderCustomers',
                    key: 'order_customer_id',
                },
            },
            amount: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            ice: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            shot: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            extra: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            price: {
                allowNull: false,
                type: Sequelize.BIGINT,
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
        await queryInterface.dropTable('ItemOrderCustomers');
    },
};
