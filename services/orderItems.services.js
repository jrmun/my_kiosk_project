const OrderItemRepository = require('../repositories/orderItems.repositories');
const ItemRepository = require('../repositories/items.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class OrderItemService {
    orderItemRepository = new OrderItemRepository();
    itemRepository = new ItemRepository();

    getOrderList = async () => {
        const orderList = await this.orderItemRepository.orderFindAll();
        return new ServiceReturn('상품 발주 내역입니다.', 200, orderList);
    };

    postOrdering = async ({ item_id }, { amount }) => {
        const findItemId = await this.itemRepository.itemFindOne({ item_id: item_id });

        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);
        if (!amount || amount < 0) throw new CustomError('수량 입력이 잘 못 되었습니다.');

        await this.orderItemRepository.createOrdering(item_id, amount);

        return new ServiceReturn('상품 발주 등록이 정상적으로 완료되었습니다.', 200);
    };

    orderPending = async (orderitem_id) => {
        const findOrderId = await this.orderItemRepository.orderFindOne(orderitem_id);
        console.log(findOrderId);
        if (!findOrderId) throw new CustomError('존재하지 않는 발주입니다.', 403);
        if (findOrderId.state !== 0) throw new CustomError('발주 확인이 불가능한 제품입니다.', 403);

        const state = 1;
        await this.orderItemRepository.orderPending(orderitem_id, state);

        return new ServiceReturn('상품 발주 보류가 정상적으로 완료되었습니다.', 200);
    };

    orderComplete = async ({ orderitem_id }) => {
        const findOrderId = await this.orderItemRepository.orderFindOne(orderitem_id);

        if (!findOrderId) throw new CustomError('존재하지 않는 발주입니다.', 403);
        if (findOrderId.state !== 1) throw new CustomError('보류 상태의 발주만 정상처리 가능합니다.', 403);

        const state = 2;
        await this.orderItemRepository.orderComplete(orderitem_id, state);

        return new ServiceReturn('상품 발주가 정상적으로 완료되었습니다.', 200);
    };

    orderCancel = async ({ orderitem_id }) => {
        const findOrderId = await this.orderItemRepository.orderFindOne(orderitem_id);
        const targetItem = await this.itemRepository.itemFindOne(findOrderId.item_id);

        const enough_amount = targetItem.amount - findOrderId.amount;

        if (!findOrderId) throw new CustomError('존재하지 않는 발주입니다.', 403);
        const state = 3;
        if (findOrderId.state === 0 || findOrderId.state === 1) {
            await this.orderItemRepository.orderSimpleCancel(orderitem_id, state);
        } else if (findOrderId.state === 2) {
            if (enough_amount <= 0) throw new CustomError('재고보다 많은 발주를 취소할 수 없습니다.');
            await this.orderItemRepository.orderCancel(orderitem_id, state);
        } else throw new CustomError('취소 과정에서 오류가 발생했습니다.', 403);

        return new ServiceReturn('상품 발주 취소가 정상적으로 완료되었습니다.', 200);
    };
}

module.exports = OrderItemService;
