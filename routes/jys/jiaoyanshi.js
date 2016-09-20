/**
 * Created by peng on 2016/9/20.
 */
var express = require('express');
var router = express.Router();
var jysDao = require('../../models/dao/jw_jys/jysDao');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/jys.html', function(req, res, next) {
    res.render('jys/jiaoyanshi', { title: 'Express' });
});


module.exports = router;
