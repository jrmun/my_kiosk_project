const { Item, sequelize, Option } = require('../models');

class ItemRepository {
    itemFindOne = async (data) => {
        return await Item.findOne({ where: data }, { include: {} });
    };

    optionFindOne = async ({ option_id }) => {
        return await Item.findOne({
            where: { option_id: option_id },
            include: [{ model: Option, where: { option_id: option_id } }],
        });
    };

    itemFindAll = async () => {
        return await Item.findAll();
    };

    createItem = async ({ name, price, type, extra_price, shot_price, hot }) => {
        await sequelize.transaction(async (transaction) => {
            const optionCreate = await Option.create({ extra_price, shot_price, hot }, { transaction });
            await Item.create({ name, price, type, option_id: optionCreate.option_id }, { transaction });
        });
    };

    updateItem = async ({ option_id, item_id, name, price, type, extra_price, shot_price, hot }) => {
        await sequelize.transaction(async (transaction) => {
            await Option.update({ extra_price, shot_price, hot }, { where: { option_id } }, { transaction });
            await Item.update({ name, price, type }, { where: { item_id } }, { transaction });
        });
    };

    deleteItem = async ({ item_id, option_id }) => {
        await Item.destroy({ where: { item_id: item_id } });
        await Option.destroy({ where: { option_id: option_id } });
    };
}

module.exports = ItemRepository;
