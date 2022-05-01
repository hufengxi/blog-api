const express = require('express');
const cors = require('cors')
const router = require('./router');
const { port } = require('./config/config.default');
const errorHandler = require('./middleware/error-handler');

// 初始化数据库
require('./model');

const app = express();
// 配置服务接口
const PORT = process.env.PORT || port;

// 将 body 转为 json 格式
app.use(express.json());
// 跨域请求
app.use(cors())

// 挂载路由
app.use('/', router);

// 挂载统一处理服务端错误中间件
app.use(errorHandler());

// 启动服务
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});









