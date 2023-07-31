const express = require('express');
const router = express.Router();

const Sellercontroller = require('../controllers/sellers.controllers');
const sellercontroller = new Sellercontroller();

router.get('/sellers/orderlist', sellercontroller.getOrderList);
router.get('');
router.put('/sellers/ordercheck/:order_customer_id', sellercontroller.ordercheck);
router.put('/sellers/completeorder/:order_customer_id', sellercontroller.completeOrder);

module.exports = router;
