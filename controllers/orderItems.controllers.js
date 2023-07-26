const OrderItemService = require('../services/orderItems.services');

class OrderItemController {
    orderItemService = new OrderItemService();

    postOrdering = async (req, res) => {
        try {
            const item_id = req.params;
            const amount = req.body;
            const { status, message, result } = await this.orderItemService.postOrdering(item_id, amount);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    orderPending = async (req, res) => {
        try {
            const orderitem_id = req.params;
            const { status, message, result } = await this.orderItemService.orderPending(orderitem_id);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    orderComplete = async (req, res) => {
        try {
            const orderitem_id = req.params;
            const { status, message, result } = await this.orderItemService.orderComplete({
                orderitem_id,
            });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    orderCancel = async (req, res) => {
        try {
            const orderitem_id = req.params;
            const { status, message, result } = await this.orderItemService.orderCancel({
                orderitem_id,
            });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}

module.exports = OrderItemController;
