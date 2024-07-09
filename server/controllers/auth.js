const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
	const accessToken = jwt.sign({ id: user.id, role: user.role, nick: user.nick }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_ACCESS_EXPIRATION,
	});
	const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.JWT_REFRESH_EXPIRATION,
	});

	return { accessToken, refreshToken };
};

const saveRefreshToken = async (token, userId) => {
	const expiryDate = new Date(); // 현재 날짜와 시간을 기준으로 expiryDate 생성

	// expiryDate의 날짜를 현재 날짜에서 .env에 설정한 refreshtoken 만료일자 만큼 추가하여 재설정
	// getDate는 객체의 현재 날짜를 가져옴
	// parseInt(process.env.JWT_REFRESH_EXPIRATION, 10)는 JWT_REFRESH_EXPIRATION의 문자열 값을 정수로 변환 후 두 번째 매개변수 10에 의해 10진수로 변환하도록 지정
	// ex) parseInt("30", 10)은 정수 30을 반환한다.

	expiryDate.setDate(expiryDate.getDate() + parseInt(process.env.JWT_REFRESH_EXPIRATION, 10));

	// 이미 존재하는 토큰이 있다면 삭제
	await User.update(
		{ token: '' },
		{
			where: {
				id: userId,
			}
		}
	);

	// 토큰과 만료일자를 id를 사용하여 업데이트
	await User.update(
		{ token: token, expiryDate: expiryDate },
		{
			where: {
				id: userId,
			}
		}
	);
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
			role: "user", // 기본으로 user권한
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
				maxAge: 15 * 60 * 1000, // 15분
			});
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
			});

			return res.json({ message: '로그인 성공', user: user.role });
		});
	})(req, res, next);
};

// 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
exports.refreshToken = async (req, res) => {
	const token = req.cookies.refreshToken; // 쿠키에서 refreshToken 읽음

	// 토큰이 없을 경우 에러
	if (!token) {
		return res.status(401).json({ message: '리프레시 토큰이 없습니다.' });
	}

	try {
		// 토큰을 사용하여 User데이터중 token값과 만료일자를 DB에서 찾음
		const tokenData = await User.findOne(
			{
				where: {
					token: token
				},
				attributes: ['token', 'expiryDate']
			});

		if (!tokenData.token) {
			return res.status(403).json({message: '유효하지 않은 리프레시 토큰입니다.'});
		}

		// 현재 날짜가 DB상의 만료날짜보다 클 경우 토큰을 비우고 만료되었다고 응답
		if (new Date() > tokenData.expiryDate) {
			await User.update(
				{token: null},
				{
					where: {
						id: userId,
					}
				}
			);
			return res.status(403).json({message: '리프레시 토큰이 만료되었습니다.'});
		}

		// jwt 검증
		// jwt.verify(token, 시크릿키, [옵션, 콜백])
		// 옵션: 알고리즘, 발급자 ,대상, 만료 확인 등
		const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

		// decode한 데이터를 이용하여 user데이터를 찾음
		const user = await User.findByPk(decoded.id);
		if (!user) {
			return res.status(404).json({message: '사용자를 찾을 수 없습니다.'});
		}

		// 액세스 토큰 갱신 구조분해할당을 통해 리프레시토큰은 갱신 X
		const {accessToken} = generateToken(user);

		// 쿠키 설정
		res.cookie('jwt', accessToken, {
			httpOnly: true,
			maxAge: 15 * 60 * 1000, // 15분
		});

		return res.status(200).json("토큰 재발급 완료");
	} catch (error) {
		console.error(error);
		return res.status(403).json({ message: '유효하지 않은 리프레시 토큰입니다.' });
	}
};

// 로그아웃
exports.logout = async (req, res) => {
	const { refreshToken } = req.cookies;

	if (refreshToken) {
		const user = await User.findOne(
			{
				where: {
					token: refreshToken
				},
				attributes: ['id']
			});

		if (user) {
			await User.update(
				{
					token: null,
					expiryDate: null,
				}, {
					where: {
						id: user.id,
					}
				}
			);
		}
	}

	res.clearCookie('jwt');
	res.clearCookie('refreshToken');
	return res.status(200).json({ message: '로그아웃 성공' });
};

// JWT 유효성 검사
exports.validateToken = (req, res) => {
	// 쿠키에서 엑세스토큰을 가져옴
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(401).json({message: '토큰이 없습니다.'});
	}

	try {
		// 가져온 토큰을 decode
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return res.status(200).json({user: decoded});
	} catch (error) {
		return res.status(403).json({message: '유효하지 않은 토큰입니다.'});
	}
};

exports.userinfo = async (req, res) => {
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(203).json("토큰이 없습니다.");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne(
			{
				where: {
					id: decoded.id
				},
				attributes: ['nick', 'email']
			});


		if (!user) {
			return res.status(404).json("사용자를 찾을 수 없습니다.")
		}

		return res.status(200).json(user);

	} catch (error) {
		console.log(error)
		return res.status(203).json("에러발생");
	}

}