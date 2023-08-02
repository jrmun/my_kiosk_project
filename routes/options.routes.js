import express from 'express';
const router = express.Router();

import OptionController from '../controllers/options.controllers';
const optionController = new OptionController();

router.post('/options', optionController.createOption);
router.put('/options/:option_id', optionController.updateOption);
router.delete('/options/:option_id', optionController.deleteOption);

module.exports = router;
