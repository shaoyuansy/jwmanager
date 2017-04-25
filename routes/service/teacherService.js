/**
 * Created by sy on 2016/9/21.
 */
var express = require('express');
var router = express.Router();


/* 教研室服务开始. */
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');

//教师管理页获取教师列表
router.get('/getList', function (req, res, next) {
    teacherDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});

router.get('/getTidByMc', function (req, res, next) {
    teacherDao.queryByMc(req, res, req.query.XM, function (result) {
        res.send({"aaData": result});
    });
});

//教师是否重复
router.post('/getNAME', function (req, res, next) {
    teacherDao.queryTeacher(req, res, req.body.TNAME, function (result) {
        res.send({"data": result});
    });
});

//负责人是否专任
router.post('/getFZR', function (req, res, next) {
    teacherDao.queryZRteacher(req, res, req.body.TNAME, function (result) {
        res.send({"data": result});
    });
});

//插入一个外聘教师，只有姓名与外聘
router.post('/addWP', function (req, res, next) {
    teacherDao.insertWP(req, res, req.body.XM, function (result) {
        res.send({"state": result});
    });
});

//删除一条教师信息记录
router.get('/delOne', function (req, res, next) {
    teacherDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});

//批量删除教师信息记录
router.post('/delSome', function (req, res, next) {
    teacherDao.deleteSome(req, res, req.body.idstr, function (result) {
        if (result) {
            res.send({"result": result});
        } else {
            //编辑失败
            res.send({"result": 0});
        }
    });
});

//导出所选教师列表
router.get('/exportBySomeId', function (req, res, next) {
    teacherDao.exportBySomeId(req, res, req.query.idstr, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});

//教师资料下载
var path = require('path');
var fs = require('fs');
router.get('/download', function (req, res, next) {
    var filePath = req.query.filePath;
    var files = path.join(__dirname, '../../public') + filePath;
    fs.exists(files, function (exists) {
        if (exists) {
            res.download(files, function (err) {
                console.log(err);
            });
        } else {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            res.write("<script type='text/javascript' charset='UTF-8'>alert('文件不存在');history.go(-1);</script>");
            res.end();
        }
    });
});
/* 教师服务结束. */
module.exports = router;