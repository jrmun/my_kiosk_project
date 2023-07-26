const CustomerRepository = require('../repositories/customer.repositories');
const ItemRepository = require('../repositories/items.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class CustomerService {
    customerRepository = new CustomerRepository();
    itemRepository = new ItemRepository();

    getOrderList = async (order_customer_id) => {
        const findOrderList = await this.customerRepository.orderFindOne(order_customer_id);
        if (!findOrderList) throw new CustomError('회원님의 주문 내역은 존재하지 않습니다. 주문을 해주세요.', 403);
    };

    Order = async (name, amount, hot, extra, shot) => {
        const findItem = await this.itemRepository.itemFindOne({ name });
        if (!findItem) throw new CustomError('존재하지 않는 메뉴입니다.', 403);
        if (amount > findItem.amount) throw new CustomError('재고가 충분하지 않습니다.', 403);

        await this.customerRepository.Order(name, amount, hot, extra, shot);

        return new ServiceReturn('주문이 완료되었습니다.', 200);
    };
}
module.exports = CustomerService;
