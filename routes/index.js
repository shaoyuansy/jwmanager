var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '教师信息管理首页',
    loginuser:req.session.userInfo.USERNAME
  });
});

module.exports = router;
