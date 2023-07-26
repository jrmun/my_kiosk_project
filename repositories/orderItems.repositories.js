const { CustomError } = require('../customClass');
const { Item, sequelize, OrderItem } = require('../models');

class OrderItemRepository {
    orderFindOne = async (orderitem_id) => {
        return await OrderItem.findOne({ where: orderitem_id });
    };

    orderFindAll = async () => {
        return await OrderItem.findAll();
    };

    createOrdering = async (item_id, amount) => {
        await OrderItem.create({ item_id: item_id, amount: amount });
    };

    orderPending = async ({ orderitem_id }, state) => {
        await OrderItem.update({ state: state }, { where: { orderitem_id: orderitem_id } });
    };

    orderComplete = async ({ orderitem_id }, state) => {
        const orderItem = await OrderItem.findOne({ where: { orderitem_id: orderitem_id } });
        const targetItem = await Item.findOne({ where: { item_id: orderItem.item_id } });
        const amount = orderItem.amount + targetItem.amount;
        const transaction = await sequelize.transaction();
        try {
            await OrderItem.update({ state: state }, { where: { orderitem_id: orderitem_id } }, { transaction });
            await Item.update({ amount: amount }, { where: { item_id: targetItem.item_id } }, { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
        }
    };

    orderSimpleCancel = async ({ orderitem_id }, state) => {
        await OrderItem.update({ state: state }, { where: { orderitem_id: orderitem_id } });
    };

    orderCancel = async ({ orderitem_id }, state) => {
        const orderItem = await OrderItem.findOne({ where: { orderitem_id: orderitem_id } });
        const targetItem = await Item.findOne({ where: { item_id: orderItem.item_id } });
        const enough_amount = targetItem.amount - orderItem.amount;
        const transaction = await sequelize.transaction();
        try {
            await OrderItem.update({ state: state }, { where: { orderitem_id: orderitem_id } }, { transaction });
            await Item.update({ amount: enough_amount }, { where: { item_id: targetItem.item_id } }, { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
        }
    };
}

module.exports = OrderItemRepository;
