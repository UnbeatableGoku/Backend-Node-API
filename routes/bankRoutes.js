const express = require('express');
const router = express.Router();
const {
    addBank,
    updateBank,
    deleteBank,
    getAllBanks,
    getBank
} = require('../controllers/bankController');

router.get('/', getAllBanks);
router.get('/:id', getBank);
router.post('/', addBank);
router.put('/:id', updateBank);
router.delete('/:id', deleteBank);

module.exports = router;
