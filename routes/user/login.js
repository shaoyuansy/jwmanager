/**
 * Created by sy on 2016/9/20  登陆页面
 */
var express = require('express');
var router = express.Router();
var userDao = require('../../models/dao/jw_user/userDao');
//获取登陆页面
router.get('/', function(req, res, next) {
    res.render('user/login', { _layoutFile:false,title: '教务信息管理系统——登录',errorMessage:'' });
});

//登录验证
router.post('/', function(req, res, next) {
    var username=req.body.username;
    var password=req.body.password;
    var icheck = req.body.icheck;//icheck cookie勾选0或1判断
    userDao.queryByUser(req, res, username, password, function(result){
        if(result.length==0)
        {
            //登陆失败
            res.render('user/login', { _layoutFile:false,title: '教务信息管理系统-登陆',errorMessage:'提示：登录名或密码错误' });
        }
        else {
            // res.cookie('user', result[0].UserID, { expires: new Date(Date.now() + 1800000), httpOnly: true });
            req.session.userInfo=result[0];
            //登陆成功
            res.redirect('/index');
        }
    });
});

//退出登录
router.get('/loginOut', function(req, res, next) {
    res.clearCookie('user', { path: '/' });
    req.session.userInfo=null;
    res.redirect('/login');
});
module.exports = router;