const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer.controllers');
const customerController = new CustomerController();

router.get('/customers/order', customerController.getOrderlist);
router.post('/customers/order/orderstart', customerController.orderStart);
router.post('/customers/order', customerController.putOnList);
router.put('/customers/order', customerController.Order);
router.delete('/customers/order/:order_customer_id', customerController.undoOrder);

module.exports = router;
