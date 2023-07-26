const CoustomerService = require('../services/customers.services');

class CustomerController {
    coustomerService = new CoustomerService();

    getOrderlist = async (req, res) => {
        try {
            const order_customer_id = req.params;
            const { status, message, result } = await this.coustomerService.getOrderlist(order_customer_id);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    Order = async (req, res) => {
        try {
            const { name, amount } = req.body;
            const { status, message, result } = await this.coustomerService.Order(name, amount);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    undoOrder = async (req, res) => {};
}

module.exports = CustomerController;
