/**
 * Created by peng on 2016/9/27.
 */
var express = require('express');
var router = express.Router();
var zyDao = require('../../models/dao/jw_zy/zyDao');

//超链接跳转
router.get('/major_course.html', function(req, res, next) {
    res.render('major_course/major_course', {
        title: '教务信息管理系统——专业-课程管理',
        sqlStr:"",
        box_title:""
    });
});

//
router.get('/getData.html', function(req, res, next) {
    var sqlStr = req.query.ksnj+","+req.query.zymc;
    res.render('major_course/major_course', {
        title: '教务信息管理系统——专业-课程管理',
        sqlStr:sqlStr,
        box_title:req.query.ksnj+"-"+req.query.zymc+"专业 课程信息"
    });
});

//
router.get('/addCourse.html', function(req, res, next) {
    var sqlStr = req.query.data;
    res.render('major_course/majorAddCourse', {
        title: '教务信息管理系统——专业-课程添加',
        sqlStr:sqlStr,
    });
});

module.exports = router;
