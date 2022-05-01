const { JsonWebTokenError } = require("jsonwebtoken");
const { User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body);
    await user.save();
    // 把密码删除掉，
    user = user.toJSON();
    delete user.password;
    // 返回user对象
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// 用户登录
exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    // 生成 token
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    // 发送成功响应（包含 token 的用户信息）
    delete user.password;
    res.status(200).json({
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    const token = req.token;
    res.status(200).json({
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
