const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');
const userValidator = require('../validator/user');
const { auth } = require('../middleware/auth');

// 用户注册
router.post('/user', userValidator.register, userCtrl.register);

// 用户登录
router.post('/user/login', userValidator.login, userCtrl.login);

// 获取当前登录用户
router.get('/user', auth, userCtrl.getCurrentUser);

// 更新当前登录用户
router.put('/user');

module.exports = router;