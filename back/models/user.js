const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			user_pk: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				comment: 'pk'
			},
			email: {
				type: Sequelize.STRING(40),
				allowNull: true,
				unique: true,
				comment: '이메일'
			},
			img: {
				type: Sequelize.STRING(255),
				allowNull: true,
				comment: '프로필 이미지???'
			},
			nick: {
				type: Sequelize.STRING(15),
				allowNull: true,
				comment: '닉네임'
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: true,
				comment: '비밀번호'
			},
			provider: {
				type: Sequelize.STRING(10),
				allowNull: false,
				defaultValue: 'local',
				comment: 'local, kakao, google'
			},
			snsId: {
				type: Sequelize.STRING(30),
				allowNull: true,
				comment: 'snsId'
			},
			role: {
				type: Sequelize.ENUM('admin', 'user'),
				allowNull: false,
				comment: '권한'
			},
			changePasswordToken: {
				type: Sequelize.STRING(100),
				allowNull: true,
				comment: '비밀번호 변경 토큰'
			},
			changePasswordExpires: {
				type: Sequelize.DATE,
				allowNull: true,
				comment: '비밀번호 변경 토큰 만료 시간'
			},
		}, {
			sequelize, // 여기에 sequelize 인스턴스를 추가합니다.
			timestamps: true,
			underscored: false,
			modelName: 'User',
			tableName: 'user',
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		});
	}

	static associate(db) {
		db.User.hasMany(db.Post, {foreignKey: 'user_pk', sourcekey: 'user_pk'});
		db.User.hasMany(db.Comment, {foreignKey: 'user_pk', sourcekey: 'user_pk'});
		db.User.hasMany(db.News, {foreignKey: 'user_pk', sourcekey: 'user_pk'})
		// db.User.hasMany(db.Like, {foreignKey: 'user_pk', sourcekey: 'user_pk'});
	}
};