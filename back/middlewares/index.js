exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).json({
			result: false,
			message: '로그인 필요'
		});
	}
};

exports.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		res.status(401).json({
			result: false,
			message: '로그인한 상태입니다.'
		});
	}
};

exports.isAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.role === 'admin') {
		next();
	} else {
		res.status(403).json({
			result: false,
			message: '관리자 권한이 필요합니다.'
		});
	}
};