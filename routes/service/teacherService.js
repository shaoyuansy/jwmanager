/**
 * Created by sy on 2016/9/21.
 */
var express = require('express');
var router = express.Router();


/* 教研室服务开始. */
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');

router.get('/getList', function (req, res, next) {
    teacherDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});

//删除一条教师信息记录
router.get('/delOne', function (req, res, next) {
    teacherDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});

//批量删除教师信息记录
router.get('/delSome', function (req, res, next) {
    teacherDao.deleteSome(req, res, req.query.idstr, function (result) {
        if (result) {
            res.send({"result":result.affectedRows});
        } else {
            //编辑失败
            res.send({"result":0});
        }
    });
});
/* 教研室服务结束. */
module.exports = router;