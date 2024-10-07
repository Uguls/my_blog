const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			post_pk: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				comment: 'pk'
			},
			title: {
				type: Sequelize.STRING(255),
				allowNull: false,
				comment: '제목'
			},
			content: {
				type: Sequelize.STRING(255),
				allowNull: false,
				comment: '파일 이름'
			},
			status: {
				type: Sequelize.TINYINT,
				defaultValue: 1,
				allowNull: false,
				comment: '1 존재, 0 삭제'
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
				comment: '생성날짜'
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
				comment: '수정날짜'
			},
			author: {
				type: Sequelize.STRING(255),
				allowNull: false,
				comment: '작성자'
			},
		}, {
			sequelize,
			timestamps: false,
			underscored: false,
			modelName: 'Post',
			tableName: 'post',
			paranoid: false,
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		});
	}

	static associate(db) {
		db.Post.belongsTo(db.User, {foreignKey: 'user_pk'});
	}
};
