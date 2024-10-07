const {Post, User, Comment, Like} = require('../models');
const e = require("express");
const {v4} = require('uuid');
const fs = require('fs');
const cookieParser = require('cookie-parser');

try {
	fs.readdirSync('uploads/post');
} catch (error) {
	fs.mkdirSync('uploads/post');
}
const filePath = 'uploads/post'

// 글 작성
/**
 * @swagger
 *  /post:
 *    post:
 *      tags: [게시판]
 *      summary: "게시판 글 작성"
 *      description: 글작성
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: title
 *        required: true
 *        description: 제목
 *        schema:
 *          type: string
 *      - in: body
 *        name: content
 *        required: true
 *        description: 내용
 *        schema:
 *          type: string
 */
exports.postWrite = async (req, res) => {
	try {
		const {
			body: {title, content},
			user
		} = req;

		if (title === undefined || title === null || title === "") {
			res.status(500).json({
				result: false,
				message: 'title 없음'
			});
			return;
		}
		if (content === undefined || content === null || content === "") {
			res.status(500).json({
				result: false,
				message: 'content 없음'
			});
			return;
		}

		const fileName = v4();
		fs.writeFileSync(`${filePath}/${fileName}`, content, (err) => {
			console.log(err);
			throw err;
		});


		const post = await Post.create({
			title: title,
			content: fileName,
			user_pk: user.user_pk,
			author: user.nick,
		});
		post.dataValues.content = content;

		post.dataValues.like = 0;
		post.dataValues.comment = {"count": 0, "rows": []}

		res.status(200).json({
			result: true,
			data: post
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			result: false,
			message: '글 작성 오류'
		});
	}
};


// 글 목록
/**
 * @swagger
 *  /post/list:
 *    get:
 *      tags: [게시판]
 *      summary: "게시판 리스트 조회"
 *      description:
 *          page가 0일 경우 전체 리스트 반환 (count 무시)<br/>
 *          created_at, updated_at이 다르면 수정된 글
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        description: 조회할 페이지
 *        schema:
 *          type: int
 *      - in: query
 *        name: count
 *        required: true
 *        description: 조회할 갯수
 *        schema:
 *          type: int
 */

exports.postList = async (req, res) => {
	try {
		const {
			query: {page, count},
			user
		} = req;

		let data;
		if (+page === 0) {
			data = await Post.findAndCountAll({
				where: {status: 1},
				order: [['created_at', 'DESC']],
				attributes: {exclude: ['user_pk']},
				include: [{
					model: User,
					attributes: ['user_pk', 'nick', 'img', 'provider']
				}]
			});
		} else {
			const offset = +count * (+page - 1);
			data = await Post.findAndCountAll({
				where: {status: 1},
				limit: +count,
				offset: +offset,
				order: [['created_at', 'DESC']],
				attributes: {exclude: ['user_pk']},
				include: [{
					model: User,
					attributes: ['user_pk', 'nick', 'img', 'provider']
				}]
			});
		}

		for (let i = 0; i < data.rows.length; i++) {
			// content 파일 읽어오기
			const parsedContent = fs.readFileSync(`${filePath}/${data.rows[i].content}`).toString();
			data.rows[i].dataValues.content = parsedContent

			const postPk = data.rows[i].post_pk;

			//좋아요 가져오기
			const totalLike = await Like.count({where: {post_pk: postPk, comment_pk: null}})
			data.rows[i].dataValues.total_like = totalLike;

			// 댓글 내가 좋아요 가져오기
			if (user === null || user === undefined) {
				data.rows[i].dataValues.like = false;
			} else {
				const myLike = await Like.findOne({where: {post_pk: postPk, user_pk: user.user_pk, comment_pk: null}})
				data.rows[i].dataValues.like = !(myLike === null || myLike === undefined);
			}

			//댓글 가져오기
			const commnet = await Comment.findAndCountAll({
				where: {post_pk: postPk, status: 1},
				attributes: {exclude: ['user_pk']},
				include: [{
					model: User,
					attributes: ['user_pk', 'nick', 'img', 'provider']
				}]
			})
			data.rows[i].dataValues.comment = commnet

			//댓글 좋아요 가져오기
			for (let j = 0; j < data.rows[i].dataValues.comment.count; j++) {
				const commentPk = data.rows[i].dataValues.comment.rows[j].comment_pk;
				if (commentPk !== 0) {
					const totalCommentLike = await Like.count({where: {post_pk: postPk, comment_pk: commentPk}})
					data.rows[i].dataValues.comment.rows[j].dataValues.total_like = totalCommentLike;

					// 대댓글 내가 좋아요 가져오기
					if (user === null || user === undefined) {
						data.rows[i].dataValues.comment.rows[j].dataValues.like = false;
					} else {
						const myCommentLike = await Like.findOne({
							where: {
								post_pk: postPk,
								comment_pk: commentPk,
								user_pk: user.user_pk
							}
						})
						data.rows[i].dataValues.comment.rows[j].dataValues.like = !(myCommentLike === null || myCommentLike === undefined);
					}
				}
			}
		}

		if (data.count === 0) {
			res.status(200).send({...data, result: false, message: '데이터 없음'});
		} else {
			res.status(200).send({...data, result: true});
		}

	} catch (error) {
		console.error(error);
		res.status(500).send('서버 에러');
	}
};


// 글 수정
/**
 * @swagger
 *  /post/{pk}:
 *    patch:
 *      tags: [게시판]
 *      summary: "게시판 글 수정"
 *      description: 글 수정
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: params
 *        name: pk
 *        required: true
 *        description: 게시글 pk
 *        schema:
 *          type: int
 *      - in: body
 *        name: title
 *        required: true
 *        description: 제목
 *        schema:
 *          type: string
 *      - in: body
 *        name: content
 *        required: true
 *        description: 내용
 *        schema:
 *          type: string
 */
exports.postEdit = async (req, res) => {
	try {
		const {
			body: {title, content},
			params: {pk},
			user
		} = req;

		if (title === undefined || title === null || title === "") {
			res.status(500).json({
				result: false,
				message: 'title 없음'
			});
			return;
		}
		if (content === undefined || content === null || content === "") {
			res.status(500).json({
				result: false,
				message: 'content 없음'
			});
			return;
		}

		const post = await Post.findOne({where: {post_pk: pk}})

		if (post === null) {
			res.status(500).json({
				result: false,
				message: '해당 게시글 없음'
			});
			return;
		}

		if (post.user_pk !== user.user_pk && user.role !== 'admin') {
			return res.status(500).json({
				result: false,
				message: '글 수정 권한이 없습니다.'
			})
		}

		fs.unlinkSync(`${filePath}/${post.content}`, content, (err) => {
			console.log(err);
			throw remove;
		});

		fs.writeFileSync(`${filePath}/${post.content}`, content, (err) => {
			console.log(err);
			throw create;
		});

		await Post.update({
				title: title,
				updated_at: Date.now()
			}, {where: {post_pk: pk}}
		);

		// //좋아요 가져오기
		// const totalLike = await Like.count({where: {post_pk : pk}})
		// post.dataValues.total_like = totalLike

		// //댓글 가져오기
		// const commnet = await Comment.findAndCountAll({where: {post_pk: pk}})
		// post.dataValues.comment = commnet

		res.status(200).json({
			result: true,
			// data: post
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			result: false,
			message: '글 수정 오류'
		});
	}
};


// 글 삭제/복구
/**
 * @swagger
 *  /post/{pk}:
 *    delete:
 *      tags: [게시판]
 *      summary: "게시판 삭제/복구"
 *      description: 글 삭제/복구
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: params
 *        name: pk
 *        required: true
 *        description: 게시글 pk
 *        schema:
 *          type: int
 */
exports.postRemove = async (req, res) => {
	try {
		const {
			params: {pk},
			user
		} = req;

		const post = await Post.findOne({where: {post_pk: pk}})

		if (post === null) {
			res.status(500).json({
				result: false,
				message: '해당 게시글 없음'
			});
			return;
		}


		if (post.user_pk !== user.user_pk && user.role !== 'admin') {
			return res.status(500).json({
				result: false,
				message: '글 삭제 권한이 없습니다.'
			})
		}

		await Post.update({
				status: post.status === 0 ? 1 : 0,
				updated_at: Date.now()
			}, {where: {post_pk: pk}}
		);

		res.status(200).send({
			result: true
		});
	} catch (err) {
		console.error(err);
		res.status(500).error(err);
	}
};


// 글 자세히보기
/**
 * @swagger
 *  /post/{pk}:
 *    get:
 *      tags: [게시판]
 *      summary: "게시판 자세히 보기"
 *      description: 글 자세히 보기
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: params
 *        name: pk
 *        required: true
 *        description: 게시글 pk
 *        schema:
 *          type: int
 */
exports.postDetail = async (req, res) => {

	const {
		params: {pk},
		user
	} = req;

	try {
		let post = await Post.findOne({
			where: {post_pk: pk},
			attributes: {exclude: ['user_pk']},
			include: [{
				model: User,
				attributes: ['user_pk', 'nick', 'img', 'provider']
			}]
		});

		if (post === null) {
			res.status(500).json({
				result: false,
				message: '해당 게시글 없음'
			});
			return;
		}

		// content 파일 읽어오기
		const parsedContent = fs.readFileSync(`${filePath}/${post.content}`).toString();
		post.dataValues.content = parsedContent;

		//좋아요 가져오기
		const totalLike = await Like.count({where: {post_pk: pk, comment_pk: null}})
		post.dataValues.total_like = totalLike

		// 내가 좋아요
		if (user === null || user === undefined) {
			post.dataValues.like = false;
		} else {
			const myLike = await Like.findOne({where: {post_pk: pk, comment_pk: null, user_pk: user.user_pk}});
			post.dataValues.like = !(myLike === null || myLike === undefined);
		}

		//댓글 가져오기
		const commnet = await Comment.findAndCountAll({
			where: {post_pk: pk},
			attributes: {exclude: ['user_pk']},
			include: [{
				model: User,
				attributes: ['user_pk', 'nick', 'img', 'provider']
			}]
		})
		post.dataValues.comment = commnet

		//댓글 좋아요
		for (let i = 0; i < post.dataValues.comment.count; i++) {
			const totalCommentLike = await Like.count({
				where: {
					post_pk: pk,
					comment_pk: post.dataValues.comment.rows[i].comment_pk
				}
			});
			post.dataValues.comment.rows[i].dataValues.total_like = totalCommentLike;
			//댓글 내가 좋아요
			if (user === null || user === undefined) {
				post.dataValues.comment.rows[i].dataValues.like = false;
			} else {
				const myCommentLike = await Like.findOne({
					where: {
						post_pk: pk,
						comment_pk: post.dataValues.comment.rows[i].comment_pk,
						user_pk: user.user_pk
					}
				});
				post.dataValues.comment.rows[i].dataValues.like = !(myCommentLike === null || myCommentLike === undefined);
			}
		}


		res.status(200).json({
			result: true,
			data: post
		});

	} catch (err) {
		console.error(err);
		res.status(500).json({
			result: false,
			message: "서버 에러"
		});
	}
}


// 글 좋아요
/**
 * @swagger
 *  /post/like/{pk}:
 *    patch:
 *      tags: [게시판]
 *      summary: "게시판 좋아요"
 *      description: 글 like/unlike
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: params
 *        name: pk
 *        required: true
 *        description: 게시글 pk
 *        schema:
 *          type: int
 */
exports.postLike = async (req, res) => {

	const {
		params: {pk},
		user
	} = req;

	try {
		const post = await Post.findOne({where: {post_pk: pk}});

		if (post === null) {
			res.status(500).json({
				result: false,
				message: '해당 게시글 없음'
			});
			return;
		}

		const myLike = await Like.findOne({where: {post_pk: pk, user_pk: user.user_pk, comment_pk: null}});

		if (myLike === null) {
			await Like.create({
				user_pk: user.user_pk,
				comment_pk: null,
				post_pk: pk
			});
		} else {
			await Like.destroy({
				where: {
					user_pk: user.user_pk,
					comment_pk: null,
					post_pk: pk
				}
			});
		}

		res.status(200).json({
			result: true
		});

	} catch (err) {
		console.error(err);
		res.status(500).json({
			result: false,
			message: "서버 에러"
		});
	}
}