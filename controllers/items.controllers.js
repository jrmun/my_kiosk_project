const ItemService = require('../services/items.services');

class ItemController {
    itemService = new ItemService();

    getItem = async (req, res) => {
        try {
            const item_id = req.params;
            const { status, message, result } = await this.itemService.getItem({
                item_id,
            });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    getItemList = async (req, res) => {
        try {
            const { status, message, result } = await this.itemService.getItemList();

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    createItem = async (req, res) => {
        try {
            const { name, price, type, extra_price, shot_price, hot } = req.body;
            const { status, message, result } = await this.itemService.createItem({ name, price, type, extra_price, shot_price, hot });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    updateItem = async (req, res) => {
        try {
            const { item_id } = req.params;
            const { name, price, type, option_id } = req.body;
            const { status, message, result } = await this.itemService.updateItem({
                item_id,
                name,
                price,
                type,
            });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    deleteItem = async (req, res) => {
        try {
            const { item_id } = req.params;
            const { status, message, result } = await this.itemService.deleteItem({
                item_id,
            });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}
module.exports = ItemController;
