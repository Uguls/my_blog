const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');
const dotenv = require("dotenv");
dotenv.config();

exports.join = async (req, res, next) => {
	const {email, nick, password} = req.body;
	console.log(req.body);
	try {
		const exUser = await User.findOne({where: {email: email}});
		if (!exUser) {
			const hash = await bcrypt.hash(password, 12);
			await User.create({
				email: email,
				nick: nick,
				password: hash,
				changePasswordToken: undefined,
				changePasswordExpires: undefined,
				role: "user",
			})
			return res.status(200).json('회원가입 완료');
		}
		return res.status(400).json({'message': '이미 존재하는 계정입니다.'});
	} catch (error) {
		console.error(error);
		return next(error);
	}
}

exports.login = (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.status(400).json({message: info.message});
		}
		req.session['connect.sid'] = user.user_pk;
		// console.log(req.session);
		req.session.save();
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return res.status(400).json({message: loginError});
			}
			return res.status(200).json(user);
			// res.redirect('/')
		});
	})(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res, next) => {
	req.logout(err => {
			if (err) {
				console.error("로그아웃 실패", err);
				return next(err);
			}
			req.session.destroy(err => {
				if (err) {
					console.error("세션 삭제 실패", err);
					return next(err);
				}
				console.log("로그아웃 및 세션 삭제 성공");
				res.status(200).json({message: '로그아웃 성공'});
			});
		}
	);
};
