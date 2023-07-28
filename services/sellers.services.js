const SellerRepository = require('../repositories/sellers.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class SellerService {
    sellerRepository = new SellerRepository();

    getOrderList = async () => {
        const findOrderList = await this.sellerRepository.getOrderListId();
        for (let i = 0; i < findOrderList.length; i++) {
            let order_customer_id = findOrderList[i].order_customer_id;
            console.log(order_customer_id);
            return new ServiceReturn('테스트 중', 200);
        }
    };

    ordercheck = async (order_customer_id) => {
        const findOrder = await this.sellerRepository.findOrder(order_customer_id);
        if (findOrder) throw new CustomError('해당 주문 도착이 없습니다.', 403);
        await this.sellerRepository.ordercheck(order_customer_id);
        return new ServiceReturn('주문 확인이 완료되었습니다.', 200);
    };
}

module.exports = SellerService;
