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
    teacherDao.queryByMc(req, res,req.query.xm, function (result) {
        res.send({"aaData": result});
    });
});

//负责人是否专任
router.post('/getFZR', function (req, res, next) {
    teacherDao.queryZRtescher(req, res,req.body.TNAME, function (result) {
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

//导出所选教师列表
router.get('/exportBySomeId', function (req, res, next) {
    teacherDao.exportBySomeId(req, res, req.query.idstr,function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});

//批量增加教师信息记录
router.get('/insertSome', function (req, res, next) {
    var sqlArr = new Array();
    sqlArr = req.query.str.split(',');
    teacherDao.insertSome(req, res, sqlArr, function (result) {
        if (result) {
            res.send({"state":result});
        }
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
            res.write("<script type='text/javascript'  charset='UTF-8'>alert('文件不存在');history.go(-1);</script>");
            res.end();
        }
    });
});
/* 教师服务结束. */
module.exports = router;