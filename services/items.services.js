const ItemRepository = require('../repositories/items.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class ItemService {
    itemRepository = new ItemRepository();

    getItem = async ({ item_id }) => {
        const findItemId = await this.itemRepository.itemFindOne({
            item_id,
        });
        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);

        const Item = {
            item_id: findItemId.item_id,
            name: findItemId.name,
            price: findItemId.price,
            type: findItemId.type,
            option_id: findItemId.option_id,
        };

        return new ServiceReturn('상품 정보를 정상적으로 전달 완료했습니다.', 200, Item);
    };

    getItemList = async () => {
        const findItemList = await this.itemRepository.itemFindAll();

        const itemList = findItemList.map((item) => {
            return {
                name: item.name,
                price: item.price,
                type: item.type,
            };
        });
        return new ServiceReturn('상품 리스트를 성공적으로 불러왔습니다.', 200, itemList);
    };

    createItem = async ({ name, price, type, extra_price, shot_price, hot }) => {
        const overlapName = await this.itemRepository.itemFindOne({ name: name });
        if (overlapName) throw new CustomError('같은 이름의 상품이 존재합니다.', 403);
        if ((!name, !price, !type)) throw new CustomError('필수 입력 항목이 충족되지 않았습니다.', 403);

        await this.itemRepository.createItem({ name, price, type, extra_price, shot_price, hot });

        return new ServiceReturn('상품 등록이 정상적으로 완료되었습니다.', 200);
    };

    updateItem = async ({ item_id, name, price, type }) => {
        const findItemId = await this.itemRepository.itemFindOne({
            item_id: item_id,
        });
        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);
        if ((!name, !price, !type)) throw new CustomError('필수 입력 항목이 충족되지 않았습니다.', 403);

        await this.itemRepository.updateItem({ item_id, name, price, type });

        return new ServiceReturn('상품 수정이 정상적으로 완료되었습니다.', 200);
    };

    deleteItem = async ({ item_id }) => {
        const findItemId = await this.itemRepository.itemFindOne({
            item_id: item_id,
        });
        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);

        await this.itemRepository.deleteItem({ item_id });

        return new ServiceReturn('상품 삭제가 정상적으로 완료되었습니다.', 200);
    };
}

module.exports = ItemService;
