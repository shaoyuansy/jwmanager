/**
 * Created by peng on 2016/9/20.
 */
var express = require('express');
var router = express.Router();
var jysDao = require('../../models/dao/jw_jys/jysDao');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '教务信息管理系统——教研室管理' });
});

router.get('/jys.html', function(req, res, next) {
    res.render('jys/jiaoyanshi', { title: '教务信息管理系统——教研室管理' });
});

router.get('/_editJys.html', function(req, res, next) {
    res.render('jys/_editJys', { title: '教务信息管理系统——教研室管理' });
});


module.exports = router;
