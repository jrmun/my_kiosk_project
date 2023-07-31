const SellerService = require('../services/sellers.services.js');

class SellerController {
    sellerService = new SellerService();

    getOrderList = async (req, res) => {
        try {
            const { status, message, result } = await this.sellerService.getOrderList();
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    ordercheck = async (req, res) => {
        try {
            const order_customer_id = req.params;
            const { status, message, result } = await this.sellerService.ordercheck(order_customer_id);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    completeOrder = async (req, res) => {
        try {
            const order_customer_id = req.params;
            const { status, message, result } = await this.sellerService.completeOrder(order_customer_id);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}

module.exports = SellerController;
