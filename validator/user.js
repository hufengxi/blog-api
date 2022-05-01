const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { User } = require("../model");
const md5 = require("../util/md5");

exports.register = validate([
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("邮箱已经被注册");
      }
    }),
  body("tel")
    .notEmpty()
    .withMessage("手机号不能为空")
    .custom(async (tel) => {
      const user = await User.findOne({ tel });
      if (user) {
        return Promise.reject("手机号已经被注册");
      }
    }),
  body("password").notEmpty().withMessage("密码不能为空"),
]);

// validate 中的 []，中的校验是 promise.all 的，并行的
// 要想串行需要 [validate([]), validate([])] 这种形式
exports.login = [
  validate([
    body("username").notEmpty().withMessage("用戶名不能為空"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("username").custom(async (username, { req }) => {
      const user = await User.findOne({
        $or: [{ email: username }, { tel: username }],
      }).select(["email", "tel", "nickname", "intro", "password"]);
      if (!user) {
        return Promise.reject("用户名或密码错误");
      }
      // 将数据挂载到请求对象中，后续的中间件也可以使用了
      req.user = user;
    }),
  ]),
  validate([
    body("password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("用户名或密码错误");
      }
    }),
  ]),
];
