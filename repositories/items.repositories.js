import { Item, sequelize, Option } from '../models';
class ItemRepository {
    itemFindOne = async (data) => {
        return await Item.findOne({
            where: data,
        });
    };

    optionFindOne = async ({ option_id }) => {
        return await Option.findOne({
            where: { option_id },
            include: [{ model: Item }],
        });
    };

    itemFindAll = async () => {
        return await Item.findAll();
    };

    createItem = async ({ name, price, type, option_id }) => {
        return await Item.create({ name, price, type, option_id });
    };

    updateItem = async ({ option_id, item_id, name, price, type, extra_price, shot_price, ice }) => {
        await sequelize.transaction(async (transaction) => {
            await Option.update({ extra_price, shot_price, ice }, { where: { option_id } }, { transaction });
            await Item.update({ name, price, type }, { where: { item_id } }, { transaction });
        });
    };

    deleteItem = async ({ item_id }) => {
        await Item.destroy({ where: { item_id: item_id } });
    };
}

module.exports = ItemRepository;
