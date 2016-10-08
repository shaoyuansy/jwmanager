/**
 * Created by peng on 2016/9/26.
 */
var express = require('express');
var router = express.Router();

/* . */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* 课程服务开始. */
var kcDao = require('../../models/dao/jw_kc/kcDao');
//获取课程信息列表
router.get('/getList', function (req, res, next) {
    kcDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});
//删除一条课程信息记录
router.get('/delOne', function (req, res, next) {
    kcDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除课程信息记录
router.get('/delSome', function (req, res, next) {
    kcDao.deleteSome(req, res, req.query.idstr, function (result) {
        res.send({"state": result});
    });
});
//批量增加课程信息记录
router.get('/insertSome', function (req, res, next) {
    var sqlArr = new Array();
    sqlArr = req.query.str.split(',');
    kcDao.insertSome(req, res, sqlArr, function (result) {
        if (result) {
            res.send({"state":result});
        }
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