var express = require('express');
var router = express.Router();
var zyDao = require('../../models/dao/jw_zy/zyDao');
var kcDao = require('../../models/dao/jw_kc/kcDao');
var zy_kcDao = require('../../models/dao/jw_zy_kc/zy_kcDao');

//超链接跳转
router.get('/major_course.html', function (req, res, next) {
    res.render('major_course/major_course', {
        title: '教务信息管理系统——专业-课程管理',
        sqlStr: "",
        box_title: ""
    });
});

router.get('/addCourse.html', function (req, res, next) {
    var sqlStr = decodeURI(req.query.data,"UTF-8");
    res.render('major_course/majorAddCourse', {
        title: '教务信息管理系统——专业-课程添加',
        sqlStr: sqlStr
    });
});
module.exports = router;
