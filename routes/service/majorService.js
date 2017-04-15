/**
 * Created by sy on 2016/9/26.
 */
var express = require('express');
var router = express.Router();

/* . */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* 专业服务开始. */
var zyDao = require('../../models/dao/jw_zy/zyDao');
//获取专业信息列表
router.get('/getList', function (req, res, next) {
    zyDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});
//选课页面获取本年专业信息列表
router.post('/selectMajor', function (req, res, next) {
    zyDao.selectMajor(req, res, req.body.years, function (result) {
        res.send({"data": result});
    });
});
//删除一条专业信息记录
router.get('/delOne', function (req, res, next) {
    zyDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除专业信息记录
router.get('/delSome', function (req, res, next) {
    zyDao.deleteSome(req, res, req.query.idstr, function (result) {
        res.send({"state": result});
    });
});
//批量增加专业信息记录
router.get('/insertSome', function (req, res, next) {
    var sqlArr = new Array();
    sqlArr = req.query.str.split(',');
    zyDao.insert(req, res, sqlArr, function (result) {
        if (result) {
            res.send({"state": result});
        }
    });
});
/* 专业服务结束. */
module.exports = router;