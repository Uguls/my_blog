const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {
	join,
	login,
	logout,
} = require('../controllers/auth');

const router = express.Router();

router.post('/join', isNotLoggedIn, join);

router.post('/login', isNotLoggedIn, login);

router.post('/logout', isLoggedIn, logout);

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/'}),
	(req, res) => {
		res.status(200).redirect('http://localhost:3002')
	});

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get(
	'/google/callback',
	passport.authenticate('google', {failureRedirect: '/'}),
	(req, res) => {
		res.status(200).redirect('http://localhost:3002')
	},
);

module.exports = router;
