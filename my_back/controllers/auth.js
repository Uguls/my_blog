const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');
const dotenv = require("dotenv");

dotenv.config();

// 회원가입
exports.join = async (req, res, next) => {
	const { email, nick, password } = req.body;
	try {
		const exUser = await User.findOne({ where: { email } });
		if (exUser) {
			return res.status(400).json('이미 가입된 이메일입니다.');
		}
		const hash = await bcrypt.hash(password, 12);
		await User.create({
			email,
			nick,
			password: hash,
			role: "user",
		});
		return res.status(200).json('회원가입 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
}

// 로그인
exports.login = (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			console.log(info.message)
			return res.status(401).json(info.message);
		}
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return res.status(loginError);
			}
			return res.status(200).json({ message: '로그인 성공', user});
		});
	})(req, res, next);
};

// 로그아웃
exports.logout = (req, res, next) => {
	req.logout(err => {
		if (err) {
			return next(err);
		} else {
			req.session.destroy();
			res.status(200).redirect('/');
		}
	});
};

exports.test = (req, res, next) => {
	console.log(req.user);
	res.status(200).json(req.user);
}