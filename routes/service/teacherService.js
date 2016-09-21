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

/* 教研室服务结束. */
module.exports = router;