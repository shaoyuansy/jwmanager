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

//获取此门课此教师可以交哪些课程
router.get('/getkcStr', function (req, res, next) {
    assignDao.querykcStr(req, res, req.query.JSXM,function (result) {
        res.send({"state": result});
    });
});
//获取此门课此负责人
router.get('/getfzrStr', function (req, res, next) {
    assignDao.queryfzrStr(req, res, req.query.KCMC,function (result) {
        res.send({"state": result});
    });
});
//获取此门课此教师可以交哪些专业
router.get('/getzyStr', function (req, res, next) {
    assignDao.queryzyStr(req, res, req.query.JSXM,req.query.KCMC,function (result) {
        res.send({"state": result});
    });
});
//获取此门课此教师可以交哪些年级->递进查询到此专业年级与班级个数
router.get('/getnjbjStr', function (req, res, next) {
    assignDao.querynjbjStr(req, res, req.query.JSXM,req.query.KCMC,req.query.ZYMC,function (result) {
        res.send({"state": result});
    });
});
//批量增加授课信息记录
router.get('/insertSome', function (req, res, next) {
    var sqlArr = new Array();
    sqlArr = req.query.str.split(',');
    assignDao.insertSome(req, res, sqlArr, function (result) {
        if (result) {
            res.send({"state":result});
        }
    });
});
//删除一条教师信息记录
router.get('/delOne', function (req, res, next) {
    assignDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除教师信息记录
router.get('/delSome', function (req, res, next) {
    assignDao.deleteSome(req, res, req.query.idstr, function (result) {
        if (result) {
            res.send({"result":result.affectedRows});
        } else {
            //编辑失败
            res.send({"result":0});
        }
    });
});


/* 授课管理服务结束. */
module.exports = router;