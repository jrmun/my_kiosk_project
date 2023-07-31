'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemOrderCustomer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.OrderCustomer, {
                sourceKey: 'order_customer_id',
                foreignKey: 'order_customer_id',
            });
            this.hasOne(models.Item, {
                sourceKey: 'item_id',
                foreignKey: 'item_id',
            });
        }
    }
    ItemOrderCustomer.init(
        {
            item_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            order_customer_id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            amount: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            ice: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            shot: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            extra: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            price: {
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
            modelName: 'ItemOrderCustomer',
        }
    );
    return ItemOrderCustomer;
};
