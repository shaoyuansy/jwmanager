/**
 * Created by peng on 2016/9/23.
 */
var express = require('express');
var router = express.Router();
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');
var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/chart.html', function (req, res, next) {
    var jysStr = "";
    jysDao.queryAll(req, res, function (jysResult) {
        if (jysResult.length > 0) {
            for (var i = 0; i < jysResult.length; i++) {
                jysStr += "<option value='" + jysResult[i].JYSMC + "'>" + jysResult[i].JYSMC + "</option>";
            }
            console.log("-----" + jysStr);
            res.render('chart/chart', {title: '教务信息管理系统——信息统计', jyscode: jysStr});
        }
    });
});

/* 获取专业技术职称数据列表信息. */
router.get('/getListByJys', function (req, res, next) {
    teacherDao.queryByJys(req, res, req.query.JYSMC, function (result) {
        res.send({data: result});
    });
});
/* 获取教师性别数据列表信息. */
router.get('/getListByJysForGender', function (req, res, next) {
    teacherDao.queryByJysForGender(req, res, req.query.JYSMC, function (result) {
        res.send({data: result});
    });
});
/* 获取教师出生年月数据列表信息. */
router.get('/getListByJysForCsny', function (req, res, next) {
    teacherDao.queryByJysForCsny(req, res, req.query.JYSMC, function (result) {
        res.send({data: result});
    });
});
/* 获取教师最高学位数据列表信息. */
router.get('/getListByJysForZgxw', function (req, res, next) {
    teacherDao.queryByJysForZgxw(req, res, req.query.JYSMC, function (result) {
        res.send({data: result});
    });
});
/* 获取教师导师类型数据列表信息. */
router.get('/getListByJysForDslx', function (req, res, next) {
    teacherDao.queryByJysForDslx(req, res, req.query.JYSMC, function (result) {
        res.send({data: result});
    });
});
/* 获取教师地区数据列表信息. */
router.get('/getListByJysForDq', function (req, res, next) {
    teacherDao.queryByJysForDq(req, res, req.query.JYSMC, function (result) {
        res.send({data: result});
    });
});
/* 获取教师教学效果数据列表信息. */
router.get('/getListByJysForJxxg', function (req, res, next) {
    teacherDao.queryByJysForJxxg(req, res, req.query.JYSMC, function (result) {
        res.send({data: result});
    });
});

module.exports = router;
