const { Item, sequelize, OrderCustomer, ItemOrderCustomer, Option } = require('../models');
const { Transaction } = require('sequelize');

class CustomerRepository {
    orderFindOne = async ({ order_customer_id }) => {
        return await ItemOrderCustomer.findOne({
            where: { order_customer_id },
            include: [{ model: OrderCustomer }, { model: Item }],
        });
    };

    Order = async (name, amount, price) => {
        const targetItem = await Item.findOne({ where: { name: name } });
        const state = 0;

        const t = await sequelize.transaction();
        try {
            const createOrder = await OrderCustomer.create({ state });
            const orderCustomer = await ItemOrderCustomer.create({
                item_id: targetItem.item_id,
                order_customer_id: createOrder.order_customer_id,
                amount: amount,
                price: price,
            });
            await Item.update({ amount: targetItem.amount - amount }, { where: { item_id: targetItem.item_id } }, { transaction: t });
            if (!createOrder) throw t.rollback();
            if (!orderCustomer) throw t.rollback();
            await t.commit();
        } catch (transactionError) {
            await t.rollback();
        }
    };
}

module.exports = CustomerRepository;
