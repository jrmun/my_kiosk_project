"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Options, {
        targetKey: "option_id",
        foreignKey: "option_id",
      });

      this.hasMany(models.OrderItem, {
        targetKey: "item_id",
        foreignKey: "item_id",
      });

      this.hasOne(models.ItemOrderCustomer, {
        targetKey: "item_id",
        foreignKey: "item_id",
      });
    }
  }
  Item.init(
    {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      option_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      price: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
