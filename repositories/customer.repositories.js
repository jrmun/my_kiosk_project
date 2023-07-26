const { Item, sequelize, OrderCustomer, ItemOrderCustomer } = require('../models');
const { Transaction } = require('sequelize');

class CustomerRepository {
    Order = async (name, amount) => {
        const targetItem = await Item.findOne({ where: { name: name } });
        const state = 1;
        const createOrder = await OrderCustomer.create({ state });
        const orderCustomer = await ItemOrderCustomer.create({
            item_id: targetItem.item_id,
            order_customer_id: createOrder.order_customer_id,
            amount: amount,
        });

        const t = await sequelize.transaction();
        try {
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
