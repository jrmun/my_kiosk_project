const OrderItemRepository = require('../repositories/orderItems.repositories');
const ItemRepository = require('../repositories/items.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class OrderItemController {
    orderItemRepository = new OrderItemRepository();
    itemRepository = new ItemRepository();

    postOrdering = async ({ item_id }, { amount }) => {
        const findItemId = await this.itemRepository.itemFindOne({ item_id: item_id });
        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);

        if (!amount || amount < 0) throw new CustomError('수량 입력이 잘 못 되었습니다.');
        await this.orderItemRepository.createOrdering(item_id, amount);

        return new ServiceReturn('상품 발주 등록이 정상적으로 완료되었습니다.', 200);
    };

    orderPending = async (orderitem_id) => {
        const findOrderId = await this.orderItemRepository.orderFindOne(orderitem_id);

        if (!findOrderId) throw new CustomError('존재하지 않는 발주입니다.', 403);
        if (findOrderId.state !== 0) throw new CustomError('발주 확인이 불가능한 제품입니다.', 403);

        await this.orderItemRepository.orderPending({ orderitem_id });

        return new ServiceReturn('상품 발주 보류가 정상적으로 완료되었습니다.', 200);
    };
}

module.exports = OrderItemController;
