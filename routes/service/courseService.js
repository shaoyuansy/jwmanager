/**
 * Created by peng on 2016/9/26.
 */
var express = require('express');
var router = express.Router();

/* 课程服务开始. */
var kcDao = require('../../models/dao/jw_kc/kcDao');
//获取课程信息列表
router.get('/getList', function (req, res, next) {
    kcDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});
//选课页面获取课程信息列表
router.post('/selectCourse', function (req, res, next) {
    kcDao.selectCourse(req, res, req.body.term, function (result) {
        res.send({"data": result});
    });
});
//删除一条课程信息记录
router.post('/delOne', function (req, res, next) {
    kcDao.delete(req, res, req.body.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除课程信息记录
router.post('/delSome', function (req, res, next) {
    kcDao.deleteSome(req, res, req.body.idstr, function (result) {
        res.send({"state": result});
    });
});
//获取适用本专业的课程信息列表
router.get('/getcourseByzy', function (req, res, next) {
   kcDao.queryByzy(req, res, req.query.zy, function (result) {
       res.send({"data": result});
   });
});
//获取除去已添加课程的课程信息列表
//router.get('/getSome', function (req, res, next) {
//    kcDao.querySome(req, res, req.query.idstr, function (result) {
//        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
//    });
//});
/* 课程服务结束. */
module.exports = router;