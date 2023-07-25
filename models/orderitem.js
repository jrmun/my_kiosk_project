'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Item, {
                targetKey: 'item_id',
                foreignKey: 'item_id',
            });
        }
    }
    OrderItem.init(
        {
            orderitem_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            item_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            amount: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            state: {
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
            modelName: 'OrderItem',
        }
    );
    return OrderItem;
};
