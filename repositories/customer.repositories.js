const { Item, sequelize, OrderCustomer, ItemOrderCustomer, Option } = require('../models');
const { Transaction } = require('sequelize');
const { Op } = require('sequelize');
class CustomerRepository {
    getOrderList = async () => {
        const state = 0;
        const orderList = await OrderCustomer.findOne({ state });
        return await ItemOrderCustomer.findAll({
            where: { order_customer_id: orderList.order_customer_id },
            include: [{ model: OrderCustomer }, { model: Item }],
        });
    };

    checkCustomer = async () => {
        const state = 0;
        return await OrderCustomer.findOne({ where: { state: 0 } });
    };

    orderStart = async () => {
        const state = 0;
        return await OrderCustomer.create({ state });
    };

    putOnList = async (name, amount, price) => {
        const targetItem = await Item.findOne({ where: { name: name } });
        const orderCustomer = await OrderCustomer.findOne({ where: { state: 0 } });
        const dupleItem = await ItemOrderCustomer.findOne({
            where: { [Op.and]: [{ item_id: targetItem.item_id }, { order_customer_id: orderCustomer.order_customer_id }] },
        });

        if (dupleItem) {
            return await ItemOrderCustomer.update({ amount: dupleItem.amount + Number(amount) }, { where: { item_id: targetItem.item_id } });
        } else {
            return await ItemOrderCustomer.create({
                item_id: targetItem.item_id,
                order_customer_id: orderCustomer.order_customer_id,
                amount: amount,
                price: price,
            });
        }
    };

    Order = async (order_customer_id) => {
        const state = 1;
        const order = await ItemOrderCustomer.findAll({
            where: { order_customer_id: 1 },
            include: [{ model: OrderCustomer }, { model: Item }],
        });
        const t = await sequelize.transaction();
        try {
            await OrderCustomer.update({ state }, { where: { order_customer_id: order_customer_id } }, { transaction: t });
            for (let i = 0; i < order.length; i++) {
                const orderItemAmount = await ItemOrderCustomer.sum('amount', { where: { item_id: order[i].item_id } });
                const targetItem = await Item.findOne({ where: { item_id: order[i].item_id } });
                await Item.update({ amount: targetItem.amount - orderItemAmount }, { where: { item_id: order[i].item_id } }, { transaction: t });
            }
        } catch (transactionError) {
            await t.rollback();
            return console.log(transactionError);
        }
    };

    undoOrder = async (order_customer_id) => {
        const state = 0;
        const orderCustomer = await OrderCustomer.findOne({ state });

        const targetItem = await Item.findAll({ where: { name: name } });

        const t = await sequelize.transaction();
        try {
            await ItemOrderCustomer.destroy({ where: { order_customer_id } }, { transaction: t });
            await OrderCustomer.destroy({ where: { order_customer_id } }, { transaction: t });
            await Item.update({ amount: targetItem.amount + amount }, { where: { name: name } }, { transaction: t });
            await t.commit();
        } catch (transactionError) {
            await t.rollback();
        }
    };
}

module.exports = CustomerRepository;
