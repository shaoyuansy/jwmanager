/**
 * Created by sy on 2016/11/1.
 */
var express = require('express');
var router = express.Router();
var kc_jsDao = require('../../models/dao/jw_kc_js/kc_jsDao');

//获取某一门课程 某一学期的记录
router.post('/getTc', function (req, res, next) {
    kc_jsDao.getTc(req, res, req.body.kcid, req.body.term, function (result) {
        res.send({"data": result});
    });
});
//获取外聘教师-课程信息列表
router.get('/getWP', function (req, res, next) {
    kc_jsDao.getWP(req, res, req.query.kcid, function (result) {
        res.send({"result": result});
    });
});
//获取外聘教师-课程选课信息列表
router.post('/getXk', function (req, res, next) {
    kc_jsDao.getXk(req, res, req.body.kcid, req.body.czr, req.body.term, function (result) {
        res.send({"result": result});
    });
});
//判断是否存在此选课信息
router.post('/exztXk', function (req, res, next) {
    kc_jsDao.exztXk(req, res, req.body.jsid, req.body.kcid, req.body.term, function (result) {
        res.send({"result": result});
    });
});
//删除一条外聘教师-课程选课信息
router.post('/deleteXk', function (req, res, next) {
    kc_jsDao.deleteXk(req, res, req.body.id, function (result) {
        res.send({"state": result});
    });
});
//删除一个课程所有信息
router.post('/delKc', function (req, res, next) {
    kc_jsDao.deleteKc(req, res, req.body.idstr, function (result) {
        res.send({"state": result});
    });
});


module.exports = router;