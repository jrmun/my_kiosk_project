"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ItemOrderCustomers", {
      item_id: {
        allowNull: false,
        references: {
          model: "Items",
          key: "item_id",
        },
        type: Sequelize.INTEGER,
      },
      order_customer_id: {
        allowNull: false,
        references: {
          model: "OrderCustomers",
          key: "order_customer_id",
        },
        type: Sequelize.INTEGER,
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ItemOrderCustomers");
  },
};
