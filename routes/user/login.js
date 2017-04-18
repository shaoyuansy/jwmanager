/**
 * Created by sy on 2016/9/20  登陆页面
 */
var express = require('express');
var router = express.Router();
var userDao = require('../../models/dao/jw_user/userDao');
//获取登陆页面
router.get('/', function (req, res, next) {
    res.render('user/login', {_layoutFile: false, title: '教务信息管理系统——登录'});
});

//登录验证
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var remember = req.body.remember;//icheck cookie勾选0或1判断
    userDao.queryByUser(req, res, username, password, function (result) {
        if (result.length == 0) {
            //登陆失败
            res.send({"success":true,"error":"login","errorMassage":"用户名或密码错误"});
        }else {
            if(remember == 1){
                res.cookie('userInfo', {username:result[0].USERNAME,password:result[0].PASSWORD}, { expires: new Date(Date.now() + 1800000), httpOnly: true });
            }
            req.session.userInfo = result[0];
            var info = {
                "isAdmin":false,
                "isLogin":true,
                "uId":result[0].ID,
                "uName":result[0].USERNAME,
                "tNo":result[0].YHBH,
            };
            req.session.loginInfo = info;
            res.send({"success":true,"data":"/index"});
        }
    });
});

//退出登录
router.get('/loginOut', function (req, res, next) {
    //console.log(req.cookies.userInfo);
    res.clearCookie('userInfo', {path: '/'});
    req.session.userInfo = null;
    res.redirect('/login');
});
module.exports = router;