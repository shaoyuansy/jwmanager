var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('master', {title: '教师信息管理系统'});
});

module.exports = router;