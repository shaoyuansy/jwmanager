var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    next();
});
router.post('/uploadFile.html', function (req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/uploads/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('上传错误: ' + err);
        } else {
            var inputFile = files.Filedata[0];
            var uploadedPath = '' + inputFile.path;
            var dstPath = './public/uploads/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {//文件更名 + 移动, 回调，传递一个err异常参数
                if (err) {
                    console.log('重命名错误: ' + err);
                }
            });
        }
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});//头部协议
        res.write('received upload:\n\n');//向请求的客户端发送响应内容
        res.end(util.inspect({fields: fields, files: filesTmp}));//结束响应 将任意对象转换为字符串的方法
    });
});
module.exports = router;