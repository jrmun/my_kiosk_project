const { Item, sequelize, Option } = require('../models');

class ItemRepository {
    itemFindOne = async ({ data }) => {
        return await Item.findOne({ where: data });
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

    updateItem = async ({ item_id, name, price, type }) => {
        return await Item.update({ name, price, type }, { where: { item_id } });
    };

    deleteItem = async ({ item_id }) => {
        return await Item.destroy({ where: { item_id: item_id } });
    };
}

module.exports = ItemRepository;
