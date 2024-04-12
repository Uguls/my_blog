const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout, test} = require('../controllers/auth');

const router = express.Router();

// POST /api/auth/join
router.post('/join', join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

router.get('/test', test)

module.exports = router;