// const Sequelize = require('sequelize');
//
// module.exports = class Post extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
//       content: {
//         type: Sequelize.STRING(140),
//         allowNull: false,
//       },
//       title: {
//         type: Sequelize.STRING(140),
//         allowNull: false,
//       },
//     }, {
//       sequelize,
//       timestamps: true,
//       underscored: false,
//       modelName: 'Post',
//       tableName: 'posts',
//       paranoid: false,
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_general_ci',
//     });
//   }
//
//   static associate(db) {
//     db.Post.belongsTo(db.User);
//     db.Post.hasMany(db.Comment, { foreignKey: 'post', sourceKey: 'id'});
//   }
// };
