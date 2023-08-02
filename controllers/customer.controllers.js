import CustomerService from '../services/customers.services';

class CustomerController {
    customerService = new CustomerService();

    getOrderlist = async (req, res) => {
        try {
            const { status, message, result } = await this.customerService.getOrderList();
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    orderStart = async (req, res) => {
        try {
            const { status, message, result } = await this.customerService.orderStart();
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    putOnList = async (req, res) => {
        try {
            const { name, amount, ice, extra, shot } = req.body;
            const { status, message, result } = await this.customerService.putOnList(name, amount, ice, extra, shot);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    Order = async (req, res) => {
        try {
            const { status, message, result } = await this.customerService.Order();
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    deleteList = async (req, res) => {
        try {
            const { status, message, result } = await this.customerService.deleteList();

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    undoOrder = async (req, res) => {
        try {
            const { status, message, result } = await this.customerService.undoOrder();
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}

module.exports = CustomerController;
