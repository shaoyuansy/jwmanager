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

router.get('/getList', function (req, res, next) {
    jysDao.queryAll(req, res, function (result) {
        res.send({"sEcho": 10, "aaData": result, "iTotalRecords": result.length});
    });
});

/* 教研室服务结束. */
module.exports = router;