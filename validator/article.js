const { body, param } = require("express-validator");
const { validate, isValidObjectId } = require("../middleware/validate");
const { Article } = require("../model");

exports.createArticle = validate([
  body("title").notEmpty().withMessage("文章标题不能为空"),
]);

exports.getArticle = validate([isValidObjectId(["params"], "articleId")]);

exports.updateArticle = [
  validate([isValidObjectId(["params"], "articleId")]),
  // 文章是否存在
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end();
    }
    next();
  },
  // 用户是否有更新权限
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).end();
    }
    next();
  },
];

exports.deleteArticle = exports.updateArticle;
