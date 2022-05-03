const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, getAllUser } = require('../controllers/user');

// Get all posts
router.get('/', getAllUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
