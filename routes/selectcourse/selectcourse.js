/**
 * Created by sy on 2016/10/10.
 */
var express = require('express');
var router = express.Router();
var kcDao = require('../../models/dao/jw_kc/kcDao');

/* . */
router.get('/', function(req, res, next) {
    res.render('selectcourse/selectcourse', { title: '教务信息管理系统——教师选课' });
});

//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editXk.html', function(req, res, next) {
    res.render('selectcourse/_editXk', {
        _layoutFile: false,
        title: '教务信息管理系统——教师选课',
        cid:req.query.cid,
        yn:req.query.yn,
        sur:req.query.sur,
        xzts:'',
        jsmc:'',
        bz:''
    });

});
//添加教师选择头数信息
router.post('/_editXk.html', function (req, res, next) {
    var ID = req.body.ID;             //ID
    var xzts = req.body.XZTS;           //头数
    var jsmc = req.body.JSMC==''?req.session.userInfo.USERNAME:req.body.JSMC;//教师名称为空则为当前登录名
    var bz = req.body.BZ;           //备注
    var yn = req.body.YN;
    var sqlArr;    //字段数组
    //获取原数据库有的头数记录
    if(ID==0){
       console.log("获取课程id失败");
    }else{
        kcDao.huoquts(req,res,ID,function(result){
            if(result){
                if(bz == ''){
                    var str = yn + xzts + "-" + jsmc + ";";//无备注
                }else{
                    var str = yn + xzts + "-" + jsmc + "(" + bz + ")" + ";";
                }
                sqlArr = [str,ID];
                //选择头数
                kcDao.xuanzets(req, res, sqlArr, function (result) {
                    if (result) {
                        //成功则返回数据库修改行数
                        res.send({"result":result.affectedRows});
                    } else {
                        //编辑失败返回0
                        res.send({"result":0});
                    }
                });
            }else{

            }
        });
    }

});
module.exports = router;