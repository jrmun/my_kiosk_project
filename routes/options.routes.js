const express = require('express');
const router = express.Router();

const OptionController = require('../controllers/options.controllers');
const optionController = new OptionController();

router.post('/options', optionController.createOption);
router.put('/options/:option_id', optionController.updateOption);
router.delete('/options/:option_id', optionController.deleteOption);

module.exports = router;
