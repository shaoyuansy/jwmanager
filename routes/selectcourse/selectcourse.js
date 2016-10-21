/**
 * Created by sy on 2016/10/10.
 */
var express = require('express');
var router = express.Router();

/* . */
router.get('/', function(req, res, next) {
    res.render('selectcourse/selectcourse', { title: '教务信息管理系统——教师选课' });
});

module.exports = router;