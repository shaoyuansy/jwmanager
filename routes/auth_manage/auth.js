var express = require('express');
var router = express.Router();
// var teacherDao = require('../../models/dao/jw_teacher/teacherDao');
// var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/', function (req, res, next) {
    res.render('auth_manage/auth', {title: '教务信息管理系统——权限管理'});
});

module.exports = router;
