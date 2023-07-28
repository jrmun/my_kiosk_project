const { Item, sequelize, OrderCustomer, ItemOrderCustomer } = require('../models');

class SellerRepository {
    getOrderListId = async () => {
        const state = 1;
        return await OrderCustomer.findAll({ where: { state } });
    };

    getOrderList = async () => {
        return await ItemOrderCustomer.findAll({
            where: { order_customer_id: orderList.order_customer_id },
            include: [{ model: OrderCustomer }, { model: Item }],
        });
    };

    findOrder = async (order_customer_id) => {
        return await OrderCustomer.findOne({ where: { order_customer_id } });
    };

    //판매자가 주문을 확인하고 받았다는 의미로 state(상태)가 2로 변함
    ordercheck = async (order_customer_id) => {
        const state = 2;
        return await OrderCustomer.update({ state }, { where: { order_customer_id: order_customer_id } });
    };
}

module.exports = SellerRepository;
