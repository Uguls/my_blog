const {Post, User,Comment} = require('../models');
const e = require("express");

exports.uploadPost = async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json('제목과 내용을 입력해주세요');
    }

    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            UserId: req.user.id,
        });

        res.status(201).json({post: post, message: '글이 성공적으로 등록되었습니다.'});
    } catch (error) {
        console.error(error);
        res.status(500).json('서버 에러');
    }
};

exports.updatePost = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const post = await Post.findOne({where: {id: postId}});
        if (!post) {
            return res.status(404).json('글이 존재하지 않습니다.');
        }
        if (post.UserId !== req.user.id) {
            return res.status(400).json('글 수정 권한이 없습니다.')
        }

        await Post.update(
          {content: req.body.content},
          {where: {id: postId}}
        );

        res.status(200).json('글이 성공적으로 수정되었습니다.');

    } catch (err) {
        console.log(err);
        res.status(500).json('글 수정 오류');
    }
};

exports.listAllPosts = async (req, res) => {
    try {
        // posts 테이블에서 id, UserId, createdAt 컬럼 가져오기
        const posts = await Post.findAll({
            attributes: ['id', 'UserId', 'createdAt', 'content', 'title']
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json('서버 에러');
    }
};

exports.getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findOne({where: {id: postId}});
        if (!post) {
            return res.status(404).json('글이 존재하지 않습니다.');
        }
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json("서버 에러");
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({where: {id: req.params.id}})
        if (!post) {
            return res.status(404).json('글이 존재하지 않습니다.');
        }
        if (post.UserId !== req.user.id) {
            return res.status(403).json('글 삭제 권한이 없습니다.')
        }
        await Post.destroy({where: {id: req.params.id } });
        res.json('글이 성공적으로 삭제되었습니다.')
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err});
    }
};