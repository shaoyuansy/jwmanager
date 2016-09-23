/**
 * Created by peng on 2016/9/23.
 */
var express = require('express');
var router = express.Router();
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');

//超链接跳转
router.get('/chart.html', function(req, res, next) {
    res.render('chart/chart', { title: '教务信息管理系统——信息统计' });
});

/* 获取图标信息. */
router.get('/getListByJys', function(req, res, next) {
    teacherDao.queryByJys(req, res,req.query.JYSMC, function (result) {
        res.send({ data: result });
    });
});
module.exports = router;
