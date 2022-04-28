const express = require('express');
const router = express.Router();
const { signup, signin, isSignedIn, emailSend, changePassword } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/privateroute', isSignedIn, async (req, res) => {
  await res.send('A protected route');
  //   res.json(req.auth);
});

router.post('/email-send', emailSend);
router.post('/change-password', changePassword);

module.exports = router;
