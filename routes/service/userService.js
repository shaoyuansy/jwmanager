var express = require('express');
var router = express.Router();


/* 用户服务开始. */
var userDao = require('../../models/dao/jw_user/userDao');

//添加激活用户
router.post('/adduser', function (req, res, next) {
    userDao.adduser(req, res, req.body.name, req.body.pwd, function (result) {
        res.send({"state": result});
    });
});
//删除用户
router.post('/deluser', function (req, res, next) {
    userDao.deluser(req, res, req.body.name, function (result) {
        res.send({"state": result});
    });
});
//删除多个用户
router.post('/delSomeuser', function (req, res, next) {
    userDao.delSomeuser(req, res, req.body.tnames, function (result) {
        res.send({"state": result});
    });
});
/* GET 获取首页所需用户的基本信息. */
router.get('/getUserData', function (req, res, next) {
    var userName = req.session.userInfo.USERNAME;
    userDao.GetUserData(req, res, userName, function (result) {
        res.send(result);
    });
});
//检查密码是否正确
router.post('/check_pwd', function (req, res, next) {
    userDao.CheckPwd(req, res, req.body.id, req.body.pwd, function (result) {
        res.send(result);
    });
});

/* 获取管理员身份教师信息 */
router.get('/getAdmins', function (req, res, next) {
    userDao.getAdmins(req, res, function (result) {
        res.send(result);
    });
});

/* 给某个教师修改密码 */
router.post('/changepswd', function (req, res, next) {
    userDao.changepswd(req, res, req.body.npassword, req.body.atname,function (result) {
        res.send({"state": result});
    });
});

/* 添加管理员身份 */
router.post('/addAdmin', function (req, res, next) {
    userDao.addAdmin(req, res, req.body.tname, function (result) {
        res.send({"state": result});
    });
});

/* 删除管理员身份 */
router.post('/delAdmin', function (req, res, next) {
    userDao.delAdmin(req, res, req.body.ID, function (result) {
        res.send({"state": result});
    });
});

/* 验证管理员身份 */
router.post('/isAdmin', function (req, res, next) {
    userDao.isAdmin(req, res, req.body.tname, function (result) {
        res.send({"result": result});
    });
});



/* 用户服务结束. */
module.exports = router;