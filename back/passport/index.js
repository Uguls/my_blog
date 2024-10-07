const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const google = require('./googleStrategy');
const {User} = require('../models');

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user.user_pk);
	});

	passport.deserializeUser((user_pk, done) => {
		// console.log(user_pk)
		User.findOne({where: {user_pk}})
			.then(user => done(null, user))
			.catch(err => done(err));
	});

	local();
	kakao();
	google();
};

