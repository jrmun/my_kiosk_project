const CustomerRepository = require('../repositories/customer.repositories');
const ItemRepository = require('../repositories/items.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class CustomerService {
    customerRepository = new CustomerRepository();
    itemRepository = new ItemRepository();

    getOrderList = async () => {
        const findOrderList = await this.customerRepository.getOrderList();
        if (!findOrderList) throw new CustomError('회원님의 주문 내역은 존재하지 않습니다. 주문을 해주세요.', 403);

        const orderList = findOrderList.map((List) => {
            return {
                name: List.Item.name,
                amount: List.amount,
                price: List.price * List.amount,
            };
        });

        return new ServiceReturn('주문 상세 보기입니다.', 200, orderList);
    };

    orderStart = async () => {
        await this.customerRepository.orderStart();
        return new ServiceReturn('환영합니다. 주문을 해주세요.', 200);
    };

    putOnList = async (name, amount, hot, extra, shot) => {
        const findItem = await this.itemRepository.itemFindOne({ name });
        if (!findItem) throw new CustomError('존재하지 않는 메뉴입니다.', 403);
        if (amount > findItem.amount) throw new CustomError('재고가 충분하지 않습니다.', 403);

        const findOptionItem = await this.itemRepository.optionFindOne({ option_id: findItem.option_id });
        if (findOptionItem.extra_price === 0 && Number(extra) !== 0) throw new CustomError('사이즈 업이 불가능한 상품입니다.', 403);
        if (findOptionItem.hot !== 0 && Number(hot) === 0) throw new CustomError('아이스가 불가능한 상품입니다.', 403);
        if (findOptionItem.hot === 0 && Number(hot) !== 0) throw new CustomError('핫이 불가능한 상품입니다.', 403);
        if (findOptionItem.shot_price === 0 && Number(shot) !== 0) throw new CustomError('샷 추가가 불가능한 상품입니다.', 403);

        let price = findItem.price;

        if (extra !== 0) price += findOptionItem.extra_price;
        if (shot === 1) price += findOptionItem.shot_price;
        if (shot === 2) price += findOptionItem.shot_price * 2;
        if (hot === 0) price += findOptionItem.hot;
        price *= amount;

        await this.customerRepository.putOnList(name, amount, price);

        return new ServiceReturn('주문 추가가 완료되었습니다.', 200);
    };

    Order = async () => {
        const findOrder = await this.customerRepository.checkCustomer();
        if (!findOrder) throw new CustomError('회원님의 주문 내역은 존재하지 않습니다. 주문을 해주세요.', 403);
        const order_customer_id = findOrder.order_customer_id;
        await this.customerRepository.Order(order_customer_id);

        return new ServiceReturn('주문이 완료되었습니다.', 200);
    };

    undoOrder = async () => {
        const findOrder = await this.customerRepository.checkCustomer();
        if (!findOrder) throw new CustomError('회원님의 주문 내역은 존재하지 않습니다. 주문을 해주세요.', 403);

        await this.customerRepository.undoOrder(findOrder.order_customer_id);

        return new ServiceReturn('주문 취소가 완료되었습니다.', 200);
    };
}
module.exports = CustomerService;
