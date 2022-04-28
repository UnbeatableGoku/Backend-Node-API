const express = require('express');
const {
    addCategory,
    getAllCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/categoryController');
const router = express.Router();

router.get('/', getAllCategory);
router.post('/', addCategory);
// router.get('/:id', getBank);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
