import express from 'express';
const router = express.Router();

import ItemController from '../controllers/items.controllers';
const itemController = new ItemController();

router.get('/items', itemController.getItemList);
router.get('/items/:item_id', itemController.getItem);
router.post('/items', itemController.createItem);
router.put('/items/:item_id', itemController.updateItem);
router.delete('/items/:item_id', itemController.deleteItemcheck);

module.exports = router;
