const SellerRepository = require('../repositories/sellers.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class SellerService {
    sellerRepository = new SellerRepository();

    getOrderList = async () => {
        const findOrderList = await this.sellerRepository.getOrderListId();
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
        return new ServiceReturn('테스트 중', 200, List);
    };

    ordercheck = async (order_customer_id) => {
        console.log(order_customer_id);
        const findOrder = await this.sellerRepository.findOrder(order_customer_id);
        if (findOrder) throw new CustomError('해당 주문 도착이 없습니다.', 403);
        await this.sellerRepository.ordercheck(order_customer_id);
        return new ServiceReturn('주문 확인이 완료되었습니다.', 200);
    };
}

module.exports = SellerService;
