const express = require('express');
const {
    addUserProfile,
    getAllUserProfile,
    updateUserProfile
} = require('../controllers/userProfileController')

const router = express.Router();

router.get('/', getAllUserProfile)
router.post('/', addUserProfile)
router.put('/:id', updateUserProfile)

module.exports = router