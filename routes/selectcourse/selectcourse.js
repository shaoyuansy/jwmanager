/**
 * Created by sy on 2016/10/10.
 */
var express = require('express');
var router = express.Router();
var kc_jsDao = require('../../models/dao/jw_kc_js/kc_jsDao');
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');

/* . */
router.get('/', function(req, res, next) {
    res.render('selectcourse/selectcourse', { title: '教务信息管理系统——教师选课' });
});

//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editXk.html', function(req, res, next) {
    res.render('selectcourse/_editXk', {
        _layoutFile: false,
        title: '教务信息管理系统——教师选课',
        kcid:req.query.cid,
        sur:req.query.sur,
        jsid:'',
        xzts:'',
        jsmc:req.session.userInfo.USERNAME,
        bz:''
    });

});
//添加教师选择头数信息
router.post('/_editXk.html', function (req, res, next) {
    var kcid = req.body.KCID;             //课程ID
    var jsid = req.body.JSID;             //教师ID
    var xzts = req.body.XZTS;           //头数
    var bz = req.body.BZ;           //备注
    var jsmc = req.body.JSMC;       //教师名称
    console.log("++++++++++++++++++++++++++++++++=="+kcid+";"+jsid+";"+xzts+";"+bz+";");
    //教师名称为空则为当前登录名，备注为选课班级
    //输入的名字与登录名不一致则为带选，备注为登录老师姓名 代选
    if(kcid==0){
        console.log("获取课程id失败");
    }else{
        if(jsmc==req.session.userInfo.USERNAME){
            kc_jsDao.xuanzets(req, res,kcid,jsid,xzts,bz,function (result) {
                if (result) {
                    //成功则返回数据库修改行数
                    res.send({"result":result.affectedRows});
                } else {
                    //编辑失败返回0
                    res.send({"result":0});
                }
            });
        }else{
            bz += req.session.userInfo.USERNAME;
            kc_jsDao.xuanzets(req, res,kcid,jsid,xzts,bz,function (result) {
                if (result) {
                    //成功则返回数据库修改行数
                    res.send({"result":result.affectedRows});
                } else {
                    //编辑失败返回0
                    res.send({"result":0});
                }
            });

        }




    }

});
module.exports = router;