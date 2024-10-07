const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const moment = require('moment');
const date = moment().format('YYYY[_]MM[_]DD');
const time = moment().format('HH:mm:ss');
const fs = require('fs');
const User = require('./user');
const Post = require('./post');

const db = {};
const sequelize = new Sequelize(
	config.database, config.username, config.password, config,
	{
		timezone: "Asia/Seoul", // DB에 저장할 때 시간 설정
		dialectOptions: {
			timezone: "Asia/Seoul", // DB에서 가져올 때 시간 설정
		}
	}
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);

User.associate(db);
Post.associate(db);

module.exports = db;
