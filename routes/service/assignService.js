/**
 * Created by sy on 2016/12/12.
 */
var express = require('express');
var router = express.Router();


/* 授课管理服务开始. */
var assignDao = require('../../models/dao/jw_assign/assignDao');
//获取教师选课信息列表
router.get('/assignList', function (req, res, next) {
    assignDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});

//获取此门课此教师可以交哪些年级
router.get('/getStr', function (req, res, next) {
    assignDao.queryStr(req, res, req.query.KCMC,req.query.XM,function (result) {
        res.send({"state": result});
    });
});
//获取此门课此教师可以交哪些年级->递进查询到此专业年级与班级个数
router.get('/getStrnjbj', function (req, res, next) {
    assignDao.queryStrnjbj(req, res, req.query.KCMC,req.query.XM,req.query.SSZY,function (result) {
        res.send({"state": result});
    });
});
//保存信息
router.post('/saveassign', function (req, res, next) {
    assignDao.querySave(req, res, req.body.JSID,req.body.KCID,req.body.SSZY,req.body.SSNJ,req.body.SSBJ,req.body.BJRS,req.body.SKSJ,req.body.SKDD,req.body.SFWSJK,req.body.SFDSZ,req.body.WPJSPJ,function (result) {
        res.send({"state": result});
    });
});

/* 授课管理服务结束. */
module.exports = router;