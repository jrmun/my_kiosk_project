import express from 'express';
const router = express.Router();

import OrderItemController from '../controllers/orderItems.controllers';
const orderItemController = new OrderItemController();

router.get('/order', orderItemController.getOrderList);
router.post('/order/:item_id', orderItemController.postOrdering);
router.put('/order/pending/:orderitem_id', orderItemController.orderPending);
router.put('/order/completed/:orderitem_id', orderItemController.orderComplete);
router.put('/order/canceled/:orderitem_id', orderItemController.orderCancel);

module.exports = router;
