const ItemRepository = require('../repositories/items.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class ItemService {
    itemRepository = new ItemRepository();

    getItem = async (item_id) => {
        const findItemId = await this.itemRepository.itemFindOne(item_id);
        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);
        console.log(findItemId);
        const findOption = await this.itemRepository.optionFindOne({ option_id: findItemId.option_id });
        const Item = {
            item_id: findItemId.item_id,
            name: findItemId.name,
            price: findItemId.price,
            type: findItemId.type,
            amount: findItemId.amount,
            extra_price: findOption.extra_price,
            shot_price: findOption.shot_price,
            ice: findOption.ice,
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

    createItem = async ({ name, price, type }) => {
        const overlapName = await this.itemRepository.itemFindOne({ name: name });
        if (overlapName) throw new CustomError('같은 이름의 상품이 존재합니다.', 403);
        if ((!name, !price, !type)) throw new CustomError('필수 입력 항목이 충족되지 않았습니다.', 403);
        let option_id = 0;
        if (type === 'coffee') option_id = 1;
        if (type === 'non-coffee') option_id = 2;

        await this.itemRepository.createItem({ name, price, type, option_id });

        return new ServiceReturn('상품 등록이 정상적으로 완료되었습니다.', 200);
    };

    updateItem = async ({ item_id, name, price, type, extra_price, shot_price, ice }) => {
        const findItemId = await this.itemRepository.itemFindOne({
            item_id: item_id,
        });
        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);
        if ((!name, !price, !type)) throw new CustomError('필수 입력 항목이 충족되지 않았습니다.', 403);

        await this.itemRepository.updateItem({ option_id: findItemId.option_id, item_id, name, price, type, extra_price, shot_price, ice });

        return new ServiceReturn('상품 수정이 정상적으로 완료되었습니다.', 200);
    };

    deleteItemcheck = async ({ item_id, answer }) => {
        const findItemId = await this.itemRepository.itemFindOne({
            item_id: item_id,
        });
        if (!findItemId) throw new CustomError('해당하는 아이템은 존재하지 않습니다.', 403);

        if (findItemId.amount !== 0 && answer === '예') return await this.itemRepository.deleteItem({ item_id, option_id: findItemId.option_id });
        if (findItemId.amount !== 0) return new ServiceReturn('삭제하려는 상품의 재고가 남아있습니다. 정말로 삭제하시겠습니까?', 200, findItemId);

        await this.itemRepository.deleteItem({ item_id, option_id: findItemId.option_id });
        return new ServiceReturn('상품 삭제가 정상적으로 완료되었습니다.', 200);
    };
}

module.exports = ItemService;
