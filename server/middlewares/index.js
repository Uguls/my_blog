const jwt = require('jsonwebtoken');
const { User } = require('../models');

// JWT를 사용하여 인증된 사용자인지 확인
exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json('로그인 필요');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json('로그인 필요');
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json('로그인 필요');
  }
};

// JWT를 사용하여 로그인되지 않은 상태인지 확인
exports.isNotLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(401).json('로그인한 상태입니다.');
  } catch (error) {
    next();
  }
};
