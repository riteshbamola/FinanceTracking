const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../utilites');
const { userSignup, userSignin, getUser } = require('../controllers/user')
router.post('/signup', userSignup)
  .post('/signin', userSignin)
  .get('/get-user', authenticateToken, getUser);

router.get('/logout', (req, res) => {
  // Perform any logout operations like session destruction
  res.status(200).json({ message: 'Logged out successfully' });
});





module.exports = router;