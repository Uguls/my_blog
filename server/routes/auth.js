const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout, refreshToken, validateToken} = require('../controllers/auth');

const router = express.Router();

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.post('/token', isLoggedIn, refreshToken);
router.post('/logout', isLoggedIn, logout);
router.get('/validate-token', validateToken);

module.exports = router;