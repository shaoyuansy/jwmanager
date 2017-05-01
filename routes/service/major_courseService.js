var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

var zy_kcDao = require('../../models/dao/jw_zy_kc/zy_kcDao');

//获取专业-课程信息列表 根据年级与专业
router.get('/getList', function (req, res, next) {
    zy_kcDao.queryAll(req, res, req.query.xn, req.query.zy, function (result) {
        res.send({"aaData": result, "iTotalRecords": result.length});
    });
});

//只获取专业-课程表
router.post('/getMC', function (req, res, next) {
    zy_kcDao.queryMC(req, res,req.body.arr, function (result) {
        res.send({"data": result});
    });
});
//删除一条专业-课程信息记录
router.get('/delOne', function (req, res, next) {
    zy_kcDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除专业-课程信息记录
router.get('/delSome', function (req, res, next) {
    zy_kcDao.deleteSome(req, res, req.query.idstr, function (result) {
        res.send({"state": result});
    });
});
//批量增加专业-课程信息记录
router.post('/insertSome', function (req, res, next) {
    var sqlArr = new Array();
    sqlArr = req.body.str.split(',');
    zy_kcDao.insert(req, res, sqlArr, function (result) {
        if (result) {
            res.send({"state": result.affectedRows});
        }
    });
});
//批量删除专业-课程信息记录 BY 专业ID
router.post('/delSomeByZy', function (req, res, next) {
    zy_kcDao.deleteSomeByZy(req, res, req.body.idstr, function (result) {
        res.send({"state": result});
    });
});
//批量删除专业-课程信息记录 BY 课程ID
router.post('/delSomeByKc', function (req, res, next) {
    zy_kcDao.deleteSomeByKc(req, res, req.body.idstr, function (result) {
        res.send({"state": result});
    });
});
//根据选择的课程id与专业学年判断是否选课重复
router.post('/getCourseByids', function (req, res, next) {
    zy_kcDao.queryCourseByids(req, res, req.body.ids, req.body.zyid, req.body.xq, function (result) {
        res.send({"result": result});
    });
});
//查看是否重复记录
router.post('/checkMajorCourse', function (req, res, next) {
    zy_kcDao.queryRepeat(req, res, req.body.zyid, req.body.kcid, req.body.term, function (result) {
        res.send({"result": result});
    });
});
//保存编辑信息
router.post('/editMajorCourse', function (req, res, next) {
    zy_kcDao.update(req, res, req.body.term, req.body.id, function (result) {
        res.send({"state": result.affectedRows});
    });
});

/* 专业-课程服务结束. */
module.exports = router;