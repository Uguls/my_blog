const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
	const accessToken = jwt.sign({ email: user.email, role: user.role, id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_ACCESS_EXPIRATION,
	});
	const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.JWT_REFRESH_EXPIRATION,
	});

	return { accessToken, refreshToken };
};

const saveRefreshToken = async (token, userId) => {
	const expiryDate = new Date();
	expiryDate.setDate(expiryDate.getDate() + parseInt(process.env.JWT_REFRESH_EXPIRATION, 10));

	// 이미 존재하는 토큰이 있다면 삭제
	await RefreshToken.destroy({ where: { userId } });

	await RefreshToken.create({
		token,
		userId,
		expiryDate,
	});
};

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
};

// 로그인
exports.login = (req, res, next) => {
	passport.authenticate('local', { session: false }, async (err, user, info) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message: info ? info.message : '로그인에 실패하였습니다.' });
		}
		req.login(user, { session: false }, async (err) => {
			if (err) {
				console.error(err);
				return next(err);
			}

			// JWT 생성 및 쿠키에 저장
			const { accessToken, refreshToken } = generateToken(user);
			await saveRefreshToken(refreshToken, user.id);

			// 쿠키 설정
			res.cookie('jwt', accessToken, {
				httpOnly: true,
				secure: false, // 배포 환경에서는 true로 설정
				maxAge: 15 * 60 * 1000, // 15분
			});
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: false, // 배포 환경에서는 true로 설정
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
			});

			return res.json({ message: '로그인 성공', user });
		});
	})(req, res, next);
};

// 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
exports.refreshToken = async (req, res) => {
	const { refreshToken } = req.cookies;
	console.log(refreshToken)

	if (!refreshToken) {
		return res.status(401).json({ message: '리프레시 토큰이 없습니다.' });
	}

	try {
		const tokenData = await RefreshToken.findOne({ where: { token: refreshToken } });
		if (!tokenData) {
			return res.status(403).json({ message: '유효하지 않은 리프레시 토큰입니다.' });
		}

		if (new Date() > tokenData.expiryDate) {
			await RefreshToken.destroy({ where: { token: refreshToken } });
			return res.status(403).json({ message: '리프레시 토큰이 만료되었습니다.' });
		}

		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		const user = await User.findByPk(decoded.id);
		if (!user) {
			return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
		}

		const { accessToken } = generateToken(user);
		// 리프레시 토큰을 갱신하지 않음

		res.cookie('jwt', accessToken, {
			httpOnly: true,
			secure: false,
			maxAge: 15 * 60 * 1000, // 15분
		});

		return res.json({ accessToken });
	} catch (error) {
		console.error(error);
		return res.status(403).json({ message: '유효하지 않은 리프레시 토큰입니다.' });
	}
};

// 로그아웃
exports.logout = (req, res) => {
	const { refreshToken } = req.cookies;

	if (refreshToken) {
		RefreshToken.destroy({ where: { token: refreshToken } });
	}

	res.clearCookie('jwt');
	res.clearCookie('refreshToken');
	return res.status(200).json({ message: '로그아웃 성공' });
};

// JWT 유효성 검사
exports.validateToken = (req, res) => {
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(401).json({ message: '토큰이 없습니다.' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return res.status(200).json({ user: decoded });
	} catch (error) {
		return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
	}
};
