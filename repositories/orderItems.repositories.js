const { Item, sequelize, OrderItem } = require('../models');

class OrderItemRepository {
    orderFindOne = async (orderitem_id) => {
        return await OrderItem.findOne({ where: orderitem_id });
    };

    createOrdering = async (item_id, amount) => {
        await OrderItem.create({ item_id: item_id, amount: amount });
    };

    orderPending = async ({ orderitem_id }) => {
        await OrderItem.update({ state: 1 }, { where: { orderitem_id: orderitem_id } });
    };
}

module.exports = OrderItemRepository;
