const crypto = require('crypto');
const { saltMd5 } = require('../config/config.default');


module.exports = str => {
    return crypto.createHash('md5')
    // 加盐：盐值就是随机数值，用于在计算密码的哈希值时加强数据的安全性，可以有效抵御诸如字典攻击、彩虹表攻击等密码攻击媒介。
    .update(`${saltMd5}str`)
    // 加密结果通常有两种表示方法：hex和base64
    .digest('hex');
}
