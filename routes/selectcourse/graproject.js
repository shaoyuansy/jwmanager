var express = require('express');
var router = express.Router();
//var kc_jsDao = require('../../models/dao/jw_kc_js/kc_jsDao');

router.get('/', function(req, res, next) {
    res.render('selectcourse/graproject', { title: '教务信息管理系统——毕业设计分配' });
});


module.exports = router;