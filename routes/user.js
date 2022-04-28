const express = require('express');
const router = express.Router();
const { getUser, newUser, updateUser, deleteUser } = require('../controllers/user');

router.get('/', (req, res) => {
  res.send('hello');
});

// Get all posts
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/user', newUser);

module.exports = router;
