const { verify } = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model");

exports.auth = async (req, res, next) => {
  // 从请求头获取 token 数据
  let token = req.headers.authorization;
  token = token ? token.split("Bearer ")[1] : null;
  if (!token) {
    return res.status(401).end("请登录后操作");
  }

  try {
    // 解析 token
    const decodedToken = await verify(token, jwtSecret);
    // 用 token 中的 userId 去查询用户信息
    req.user = await User.findById(decodedToken.userId);
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).end("请登录后操作");
  }
};
