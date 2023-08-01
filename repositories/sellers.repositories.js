const { Item, sequelize, OrderCustomer, ItemOrderCustomer, Option } = require('../models');

class SellerRepository {
    getOrderListId = async (state) => {
        return await OrderCustomer.findAll({
            where: { state },
            include: [
                {
                    model: ItemOrderCustomer,
                    include: [
                        {
                            model: Item,
                        },
                    ],
                },
            ],
        });
    };

    findOrder = async (order_customer_id) => {
        console.log(order_customer_id);
        return await OrderCustomer.findOne({ where: { order_customer_id: order_customer_id } });
    };

    //판매자가 주문을 확인하고 받았다는 의미로 state(상태)가 2로 변함
    ordercheck = async (order_customer_id) => {
        const state = 2;
        return await OrderCustomer.update({ state: state }, { where: { order_customer_id } });
    };

    //주문자가 음식을 가져가서 모든 상태가 완료되면 state(상태)가 3로 변함
    completeOrder = async (order_customer_id) => {
        const state = 3;
        return await OrderCustomer.update({ state: state }, { where: { order_customer_id } });
    };
}

module.exports = SellerRepository;
