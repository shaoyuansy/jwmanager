/**
 * Created by sy on 2016/9/29.
 */
var express = require('express');
var router = express.Router();


/* 用户服务开始. */
var userDao = require('../../models/dao/jw_user/userDao');

/* GET 获取首页所需用户的基本信息. */
router.get('/getUserData', function (req, res, next) {
    var userName = req.session.userInfo.USERNAME;
    userDao.GetUserData(req, res, userName, function (result) {
        res.send(result);
    });
});

/* 用户服务结束. */
module.exports = router;