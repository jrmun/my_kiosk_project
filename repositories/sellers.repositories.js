const { Item, sequelize, OrderCustomer, ItemOrderCustomer, Option } = require('../models');

class SellerRepository {
    getOrderListId = async () => {
        const state = 1;
        return await OrderCustomer.findAll({
            where: { state },
            include: [
                {
                    model: ItemOrderCustomer,
                    include: [
                        {
                            model: Item,
                            include: [
                                {
                                    model: Option,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    };

    findOrder = async (order_customer_id) => {
        return await OrderCustomer.findOne({ where: { order_customer_id } });
    };

    //판매자가 주문을 확인하고 받았다는 의미로 state(상태)가 2로 변함
    ordercheck = async ({ order_customer_id }) => {
        const state = 2;
        return await OrderCustomer.update({ state: state }, { where: { order_customer_id: order_customer_id } });
    };

    //판매자가 주문을 확인하고 받았다는 의미로 state(상태)가 2로 변함
    deliverycheck = async ({ order_customer_id }) => {
        const state = 3;
        return await OrderCustomer.update({ state: state }, { where: { order_customer_id: order_customer_id } });
    };
}

module.exports = SellerRepository;
