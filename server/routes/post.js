const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  afterUploadImage,
  uploadPost,
  updatePost,
  deletePost,
  listAllPosts,
  getPost,
} = require("../controllers/Todo");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

/** CREATE **/
router.post("/create", uploadPost);

/** READ **/
// 상세페이지
router.get("/detail/:id", isLoggedIn, getPost);
// 전체 글 목록
router.get("/lists", listAllPosts);

/** UPDATE **/
router.put("/update/:id", isLoggedIn, updatePost);

/** DELETE **/
router.delete("/delete/:id", isLoggedIn, deletePost);

module.exports = router;
