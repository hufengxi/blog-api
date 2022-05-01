const mongoose = require("mongoose");
const baseModel = require("./base");
const md5 = require("../util/md5");

const userSchema = new mongoose.Schema({
  ...baseModel,
  // 用户名
  username: {
    type: String,
    required: true,
  },
  // 昵称
  nickName: {
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
  // 简介
  intro: {
    type: String,
    required: false,
  },
});

module.exports = userSchema;
