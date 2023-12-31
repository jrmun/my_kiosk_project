import express from 'express';
const router = express.Router();

import Sellercontroller from '../controllers/sellers.controllers';
const sellercontroller = new Sellercontroller();

router.get('/sellers/orderlist', sellercontroller.getOrderList);
router.get('/sellers/repair', sellercontroller.orderRepair); //판매 내역 확인
router.put('/sellers/ordercheck/:order_customer_id', sellercontroller.ordercheck);
router.put('/sellers/completeorder/:order_customer_id', sellercontroller.completeOrder);

module.exports = router;
