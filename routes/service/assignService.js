/**
 * Created by sy on 2016/12/12.
 */
var express = require('express');
var router = express.Router();

var assignDao = require('../../models/dao/jw_assign/assignDao');
//获取教师选课信息列表
router.get('/assignList', function (req, res, next) {
    var term = decodeURI(req.query.term,"UTF-8");
    assignDao.queryAll(req, res, term, function (result) {
        res.send({"data": result});
    });
});

//获取此门课此教师可以交哪些课程
router.post('/getkcStr', function (req, res, next) {
    assignDao.querykcStr(req, res, req.body.JSXM, function (result) {
        res.send({"state": result});
    });
});
//获取此门课此负责人
router.post('/getfzrStr', function (req, res, next) {
    assignDao.queryfzrStr(req, res, req.body.KCMC, function (result) {
        res.send({"state": result});
    });
});
//获取此门课此教师可以交哪些专业
router.post('/getzyStr', function (req, res, next) {
    assignDao.queryzyStr(req, res, req.body.JSXM, req.body.KCMC, function (result) {
        res.send({"state": result});
    });
});
//获取此门课此教师可以交哪些年级->递进查询到此专业年级与班级个数
router.post('/getnjbjStr', function (req, res, next) {
    assignDao.querynjbjStr(req, res, req.body.JSXM, req.body.KCMC, req.body.ZYMC, function (result) {
        res.send({"state": result});
    });
});
//删除一条教师信息记录
router.post('/delOne', function (req, res, next) {
    assignDao.delete(req, res, req.body.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除教师信息记录
router.post('/delSome', function (req, res, next) {
    assignDao.deleteSome(req, res, req.body.idstr, function (result) {
        if (result) {
            res.send({"result": result.affectedRows});
        } else {
            res.send({"result": 0});
        }
    });
});

module.exports = router;