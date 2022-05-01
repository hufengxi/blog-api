const mongoose = require("mongoose");
const baseModel = require("./base");
const md5 = require("../util/md5");

const userSchema = new mongoose.Schema({
  ...baseModel,
  // 邮箱
  email: {
    type: String,
    required: true,
  },
  // 手机号
  tel: {
    type: String,
    required: true,
  },
  // 昵称
  nickname: {
    type: String,
    required: false,
  },
  // 密码
  password: {
    type: String,
    required: true,
    set: (v) => md5(v),
    select: false,
  },
  // 头像地址
  facepath: {
    type: String,
    required: false,
  },
  // 简介
  intro: {
    type: String,
    required: false,
  },
});

module.exports = userSchema;
