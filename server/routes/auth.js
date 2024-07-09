const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout, refreshToken, validateToken, userinfo} = require('../controllers/auth');

const router = express.Router();

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.get('/token', refreshToken);
router.post('/logout', isLoggedIn, logout);
router.get('/validate-token', validateToken);
router.get('/userinfo', isLoggedIn, userinfo);

module.exports = router;