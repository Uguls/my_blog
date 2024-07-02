const Sequelize = require('sequelize');

module.exports = class RefreshToken extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			token: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			expiryDate: {
				type: Sequelize.DATE,
				allowNull: false,
			}
		}, {
			sequelize,
			timestamps: true,
			underscored: false,
			modelName: 'RefreshToken',
			tableName: 'refresh_tokens',
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		});
	}

	static associate(db) {
		db.RefreshToken.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
	}
};
