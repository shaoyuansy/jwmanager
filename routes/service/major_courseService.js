/**
 * Created by peng on 2016/9/27.
 */
var express = require('express');
var router = express.Router();

/* . */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* 专业-课程服务开始. */
var zy_kcDao = require('../../models/dao/jw_zy_kc/zy_kcDao');
//获取专业-课程信息列表
router.get('/getList', function (req, res, next) {
    console.log("开始查询："+req.query.sqlstr);
    zy_kcDao.queryAll(req, res, req.query.sqlstr, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});
//只获取专业-课程表
router.get('/getMC', function (req, res, next) {
    zy_kcDao.queryMC(req, res,req.query.arr, function (result) {
        res.send({"aaData": result});
    });
});
//删除一条专业-课程信息记录
router.get('/delOne', function (req, res, next) {
    zy_kcDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除专业-课程信息记录
router.get('/delSome', function (req, res, next) {
    zy_kcDao.deleteSome(req, res, req.query.idstr, function (result) {
        res.send({"state": result});
    });
});
//批量增加专业-课程信息记录
router.get('/insertSome', function (req, res, next) {
    var sqlArr = new Array();
    sqlArr = req.query.str.split(',');
    zy_kcDao.insert(req, res, sqlArr, function (result) {
        if (result) {
            res.send({"state": result});
        }
    });
});
//批量删除专业-课程信息记录 BY 专业ID
router.get('/delSomeByZy', function (req, res, next) {
    zy_kcDao.deleteSomeByZy(req, res, req.query.idstr, function (result) {
        res.send({"state": result});
    });
});
//批量删除专业-课程信息记录 BY 课程ID
router.get('/delSomeByKc', function (req, res, next) {
    zy_kcDao.deleteSomeByKc(req, res, req.query.idstr, function (result) {
        res.send({"state": result});
    });
});
/* 专业-课程服务结束. */
module.exports = router;