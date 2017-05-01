var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

var zyDao = require('../../models/dao/jw_zy/zyDao');
//获取专业信息列表
router.get('/getList', function (req, res, next) {
    zyDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});
//根据年份获取专业信息列表
router.post('/getListByYear', function (req, res, next) {
    zyDao.queryByYear(req, res, req.body.KSNJ, function (result) {
        res.send({"data": result});
    });
});
//选课页面获取本年专业信息列表
router.post('/selectMajor', function (req, res, next) {
    zyDao.selectMajor(req, res, req.body.years, function (result) {
        res.send({"data": result});
    });
});
//删除一条专业信息记录
router.post('/delOne', function (req, res, next) {
    zyDao.delete(req, res, req.body.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除专业信息记录
router.post('/delSome', function (req, res, next) {
    zyDao.deleteSome(req, res, req.body.idstr, function (result) {
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
//获取专业ID
router.post('/getZyId', function (req, res, next) {
    zyDao.queryZyId(req, res, req.body.sqlStr, function (result) {
        res.send({"result": result});
    });
});
//根据年级与专业获取专业每个班大约人数
router.post('/getRS', function (req, res, next) {
    zyDao.queryZyRs(req, res, req.body.SSNJ, req.body.ZYMC, function (result) {
        res.send({"result": result});
    });
});
/* 专业服务结束. */
module.exports = router;