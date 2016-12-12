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

/* 授课管理服务结束. */
module.exports = router;