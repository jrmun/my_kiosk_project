import express from 'express';
const router = express.Router();

import CustomerController from '../controllers/customer.controllers';
const customerController = new CustomerController();

router.get('/customers/order', customerController.getOrderlist); // putOnList한 내역을 확인
router.post('/customers/order/orderstart', customerController.orderStart);
router.post('/customers/order', customerController.putOnList);
router.put('/customers/order', customerController.Order);
router.delete('/customers/order/deleteList', customerController.deleteList);
router.delete('/customers/order', customerController.undoOrder); // 오더 취소하는 로직은 판매자 쪽으로

module.exports = router;
