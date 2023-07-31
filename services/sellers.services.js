const SellerRepository = require('../repositories/sellers.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class SellerService {
    sellerRepository = new SellerRepository();

    getOrderList = async () => {
        const state = 1;
        const findOrderList = await this.sellerRepository.getOrderListId(state);
        const List = findOrderList.map((List) => {
            return {
                order_customer_id: List.order_customer_id,
                name: List.ItemOrderCustomer.Item.name,
                amount: List.ItemOrderCustomer.amount,
                extra: List.ItemOrderCustomer.Item.Option.extra_price,
                shot: List.ItemOrderCustomer.Item.Option.shot_price,
                hot: List.ItemOrderCustomer.Item.Option.hot_price,
            };
        });
        return new ServiceReturn('현재 주문 내역입니다.', 200, List);
    };

    orderRepair = async () => {
        const state = 3;
        const findOrderList = await this.sellerRepository.getOrderListId(state);
        const List = findOrderList.map((List) => {
            return {
                order_customer_id: List.order_customer_id,
                name: List.ItemOrderCustomer.Item.name,
                amount: List.ItemOrderCustomer.amount,
                extra: List.ItemOrderCustomer.Item.Option.extra_price,
                shot: List.ItemOrderCustomer.Item.Option.shot_price,
                hot: List.ItemOrderCustomer.Item.Option.hot_price,
            };
        });
        return new ServiceReturn('판매 내역입니다.', 200, List);
    };

    ordercheck = async (order_customer_id) => {
        console.log(order_customer_id);
        const findOrder = await this.sellerRepository.findOrder(order_customer_id);
        if (findOrder) throw new CustomError('해당 주문 도착이 없습니다.', 403);
        await this.sellerRepository.ordercheck(order_customer_id);
        return new ServiceReturn('주문 확인이 완료되었습니다.', 200);
    };

    completeOrder = async (order_customer_id) => {
        console.log(order_customer_id);
        const findOrder = await this.sellerRepository.findOrder(order_customer_id);
        if (findOrder) throw new CustomError('해당 주문 도착이 없습니다.', 403);
        await this.sellerRepository.completeOrder(order_customer_id);
        return new ServiceReturn('고객께서 음식을 수령해갔습니다.', 200);
    };
}

module.exports = SellerService;
