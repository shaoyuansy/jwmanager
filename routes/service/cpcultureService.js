var express = require('express');
var router = express.Router();
var assignDao = require('../../models/dao/jw_assign/assignDao');
var cpcultureDao = require('../../models/dao/jw_cpculture/cpcultureDao');

//获取教师选课信息列表
router.get('/cpcultureList', function (req, res, next) {
    var nj = decodeURI(req.query.nj,"UTF-8");
    cpcultureDao.queryAll(req, res, nj, function (result) {
        res.send({"data": result});
    });
});
//获取文化课选课头数
router.post('/getZTS', function (req, res, next) {
    assignDao.queryZTS(req, res, req.body.SSNJ, function (result) {
        res.send({"result": result});
    });
});
//获取文化课选课详情
router.post('/getassignMsg', function (req, res, next) {
    assignDao.queryassignMsg(req, res, req.body.SSNJ, function (result) {
        res.send({"result": result});
    });
});
//验证文化课选课是否重复
router.post('/existCulture', function (req, res, next) {
    cpcultureDao.queryexistCulture(req, res, req.body.ZJMC, req.body.KS, req.body.ZKT, req.body.SJ, req.body.SSNJ, req.body.SSZY, req.body.SSBJ, req.body.SKSJ, req.body.SKDD, function (result) {
        res.send({"result": result});
    });
});
//文化课选课
router.post('/assignCulture', function (req, res, next) {
    cpcultureDao.queryassignCulture(req, res, req.body.ZJMC, req.body.KS, req.body.ZKT, req.body.SJ, req.body.SSNJ, req.body.SSZY, req.body.SSBJ, req.body.SKSJ, req.body.SKDD, req.body.SKJS, function (result) {
        res.send({"result": result});
    });
});

module.exports = router;