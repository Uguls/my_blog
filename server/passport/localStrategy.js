const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const cookieExtractor = req => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies.jwt;
	}
	return token;
};

module.exports = () => {
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const exUser = await User.findOne({ where: { email } });
				if (exUser) {
					const result = await bcrypt.compare(password, exUser.password);
					if (result) {
						done(null, exUser);
					} else {
						done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
					}
				} else {
					done(null, false, { message: '가입되지 않은 회원입니다.' });
				}
			} catch (error) {
				console.error(error);
				done(error);
			}
		}
	));

	passport.use(new JWTStrategy({
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_SECRET,
		},
		async (jwtPayload, done) => {
			try {
				const user = await User.findByPk(jwtPayload.id);
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				console.error(error);
				done(error);
			}
		}));
};
