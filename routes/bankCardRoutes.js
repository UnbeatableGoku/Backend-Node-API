const express = require('express');
const router = express.Router();

const { addCard, getCard, updateCard, deleteCard } = require('../controllers/bankCardController');

router.post('/', addCard);
router.get('/:id', getCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;
