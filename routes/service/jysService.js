/**
 * Created by peng on 2016/9/20.
 */
var express = require('express');
var router = express.Router();

/* . */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* 教研室服务开始. */
var jysDao = require('../../models/dao/jw_jys/jysDao');
//获取教研室信息列表
router.get('/getList', function (req, res, next) {
    jysDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});
//删除一条教研室信息记录
router.get('/delOne', function (req, res, next) {
    jysDao.delete(req, res, req.query.ID, function (result) {
        res.send({"state": result});
    });
});
/* 教研室服务结束. */
module.exports = router;