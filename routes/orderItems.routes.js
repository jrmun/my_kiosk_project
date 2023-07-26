const express = require('express');
const router = express.Router();

const OrderItemController = require('../controllers/orderItems.controllers');
const orderItemController = new OrderItemController();

router.post('/order/:item_id', orderItemController.postOrdering);
router.put('/order/pending/:orderitem_id', orderItemController.orderPending);
router.put('/order/completed/:orderitem_id', orderItemController.orderComplete);
router.put('/order/canceled/:orderitem_id', orderItemController.orderCancel);

module.exports = router;
