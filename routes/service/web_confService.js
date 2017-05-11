var express = require('express');
var router = express.Router();
var confDao = require('../../models/dao/web_conf/confDao');

//删除一条教师信息记录
router.post('/updatepswd', function (req, res, next) {
    confDao.updatepswd(req, res, req.body.npswd, function (result) {
        res.send({"state": result});
    });
});

module.exports = router;