const express = require('express');
const router = express.Router();

const Sellercontroller = require('../controllers/sellers.controllers');
const sellercontroller = new Sellercontroller();

router.get('/sellers/orderlist', sellercontroller.getOrderList);
router.put('/sellers/ordercheck/:order_customer_id', sellercontroller.ordercheck);

module.exports = router;
