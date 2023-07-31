'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Item, {
                sourceKey: 'option_id',
                foreignKey: 'option_id',
            });
        }
    }
    Option.init(
        {
            option_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            extra_price: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            shot_price: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            ice: {
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
            modelName: 'Option',
        }
    );
    return Option;
};
