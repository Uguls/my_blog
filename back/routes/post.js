const express = require("express");
const multer = require("multer");
const path = require("path");

const {
	postWrite,
	postList,
	postEdit,
	postRemove,
	postDetail,
	postLike,
} = require("../controllers/post");

const {isLoggedIn} = require("../middlewares");

const router = express.Router();

// 게시글 생성
router.post("/", isLoggedIn, postWrite);
// router.post('/', postWrite);

// 전체 글 목록
router.get("/list", postList);

// 게시글 수정
router.patch("/:pk", isLoggedIn, postEdit);
// router.patch('/:pk', postEdit);

// 게시글 삭제
router.delete("/:pk", isLoggedIn, postRemove);
// router.delete('/:pk', postRemove);

// 상세페이지
router.get("/:pk", postDetail);
// router.get('/:pk', postDetail);

// 좋아요
router.patch("/like/:pk", isLoggedIn, postLike);
// router.patch('/like/:pk', postLike);

module.exports = router;
