const express = require("express");

const articleCtrl = require("../controller/article");
const { auth } = require("../middleware/auth");
const articleValidator = require("../validator/article");

const router = express.Router();

// 创建文章
router.post(
  "/article",
  auth,
  articleValidator.createArticle,
  articleCtrl.createArticle
);

// 获取文章列表
router.get("/article", auth, articleCtrl.getArticles);

// 获取文章
router.get(
  "/article/:articleId",
  articleValidator.getArticle,
  articleCtrl.getArticle
);

// 更新文章
router.put(
  "/article/:articleId",
  auth,
  articleValidator.updateArticle,
  articleCtrl.updateArticle
);

// 删除文章
router.delete(
  "/article/:articleId",
  auth,
  articleValidator.deleteArticle,
  articleCtrl.deleteArticle
);

module.exports = router;
