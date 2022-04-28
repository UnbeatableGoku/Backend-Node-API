const express = require('express');
const router = express.Router();

const {
    getAll,
    addCard,
    getCard
} = require('../controllers/bankCardController');

router.post('/', addCard)
router.get('/:id', getCard)

module.exports = router
