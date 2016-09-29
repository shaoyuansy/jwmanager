var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '教务信息管理系统——首页',
    loginuser:req.session.userInfo.USERNAME
  });
});

module.exports = router;
