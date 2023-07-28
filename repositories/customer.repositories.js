const { Item, sequelize, OrderCustomer, ItemOrderCustomer } = require('../models');
const { Transaction } = require('sequelize');
const { Op } = require('sequelize');
class CustomerRepository {
    //현재 장바구니에 넣어 놓은 아이템들을 보여줌
    getOrderList = async () => {
        const state = 0;
        const orderList = await OrderCustomer.findOne({ where: { state } });
        return await ItemOrderCustomer.findAll({
            where: { order_customer_id: orderList.order_customer_id },
            include: [{ model: OrderCustomer }, { model: Item }],
        });
    };

    //현재 state(0)가 0인지 확인 0이 아닐 경우 스타트를 먼저 시작해야함
    checkCustomer = async () => {
        return await OrderCustomer.findOne({ where: { state: 0 } });
    };

    // 키오스크 스타트 버튼처럼 시작API를 실행하면 state(상태)가 0됨.
    orderStart = async () => {
        const state = 0;
        return await OrderCustomer.create({ state });
    };

    //주문 아이디에 주문 내용들을 저장 Order()에서 저장된 내용이 전부 구매되도록 함
    putOnList = async (name, amount, price) => {
        const targetItem = await Item.findOne({ where: { name: name } });
        const orderCustomer = await OrderCustomer.findOne({ where: { state: 0 } });
        //아이템을 넣을 때 아이템이 이미 장바구니에 존재하는 지를 확인
        const dupleItem = await ItemOrderCustomer.findOne({
            where: { [Op.and]: [{ item_id: targetItem.item_id }, { order_customer_id: orderCustomer.order_customer_id }, { price: price }] },
        });
        //중복 아이템이 있다면 중복아이템에 추가 수량을 update해줌
        if (dupleItem) {
            return await ItemOrderCustomer.update(
                {
                    amount: dupleItem.amount + Number(amount),
                },
                {
                    where: { [Op.and]: [{ item_id: targetItem.item_id }, { order_customer_id: orderCustomer.order_customer_id }, { price: price }] },
                }
            );
        } else {
            return await ItemOrderCustomer.create({
                item_id: targetItem.item_id,
                order_customer_id: orderCustomer.order_customer_id,
                amount: amount,
                price: price,
            });
        }
    };
    //주문 접수 시 state(상태)가 1로 변경되면서 주문 접수 완료 처리
    Order = async (order_customer_id) => {
        const state = 1;
        const order = await ItemOrderCustomer.findAll({
            where: { order_customer_id: order_customer_id },
        });

        const t = await sequelize.transaction();
        try {
            await OrderCustomer.update({ state }, { where: { order_customer_id: order_customer_id } }, { transaction: t });
            for (let i = 0; i < order.length; i++) {
                const orderItemAmount = await ItemOrderCustomer.sum('amount', {
                    where: { [Op.and]: [{ item_id: order[i].item_id }, { order_customer_id: order_customer_id }] },
                });
                const targetItem = await Item.findOne({ where: { item_id: order[i].item_id } });
                await Item.update({ amount: targetItem.amount - orderItemAmount }, { where: { item_id: order[i].item_id } }, { transaction: t });
            }
        } catch (transactionError) {
            await t.rollback();
            return console.log(transactionError);
        }
    };

    //장바구니 삭제 시 장바구니 내의 아이템이 삭제됨
    deleteList = async (order_customer_id) => {
        await ItemOrderCustomer.destroy({
            where: { order_customer_id: order_customer_id },
        });
    };

    //주문 취소 시 주문자 Id, 장바구니내의 아이템들이 삭제처리 됨
    undoOrder = async (order_customer_id) => {
        const order = await ItemOrderCustomer.findAll({
            where: { order_customer_id: order_customer_id },
        });

        const t = await sequelize.transaction();
        try {
            for (let i = 0; i < order.length; i++) {
                const orderItemAmount = await ItemOrderCustomer.sum('amount', {
                    where: { [Op.and]: [{ item_id: order[i].item_id }, { order_customer_id: order_customer_id }] },
                });
                const targetItem = await Item.findOne({ where: { item_id: order[i].item_id } });
                await Item.update({ amount: targetItem.amount + orderItemAmount }, { where: { item_id: order[i].item_id } }, { transaction: t });
            }
        } catch (transactionError) {
            await t.rollback();
            return console.log(transactionError);
        }

        await ItemOrderCustomer.destroy({
            where: { order_customer_id: order_customer_id },
        });
        await OrderCustomer.destroy({
            where: { order_customer_id: order_customer_id },
        });
    };
}

module.exports = CustomerRepository;
