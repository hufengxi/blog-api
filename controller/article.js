const { Article, User } = require("../model");
const mongoose = require("mongoose");

// 创建文章
exports.createArticle = async (req, res, next) => {
  try {
    // 处理请求
    const article = new Article(req.body);
    article.author = req.user._id;
    article.populate("author");
    await article.save();
    res.status(201).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

// 获取文章列表
exports.getArticles = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0, userId, title } = req.query;
    const filter = {};
    if (userId) {
      filter.author = userId ? userId : null;
    }

    if (title) {
      const regex = new RegExp(title);
      filter.title = { $regex: regex, $options: "i" };
    }

    const artilces = await Article.find(filter)
      .populate("author")
      .skip(Number.parseInt(offset)) // 跳过多少条
      .limit(Number.parseInt(limit)) // 取多少条
      .sort({
        // -1 倒叙，1 升序
        createTime: -1,
      });

    const articlesCount = await Article.find(filter).countDocuments();

    res.status(200).json({
      items: artilces,
      total: articlesCount,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// 获取文章
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).populate(
      "author"
    );
    if (!article) {
      return res.status(404).end();
    }
    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};

// 更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article;
    const bodyArticle = req.body;
    article.title = bodyArticle.title || article.title;
    article.body = bodyArticle.body || article.body;
    await article.save();
    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

// 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article;
    await article.remove();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
