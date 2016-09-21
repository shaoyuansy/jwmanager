var express = require('express');
var router = express.Router();

/* GET teacher page. */
router.get('/', function(req, res, next) {
    res.render('teacher/teacher', {
        title: '教师信息管理'
    });
});

module.exports = router;
