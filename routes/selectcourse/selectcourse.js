var express = require('express');
var router = express.Router();
var kc_jsDao = require('../../models/dao/jw_kc_js/kc_jsDao');
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');

router.get('/', function(req, res, next) {
    res.render('selectcourse/selectcourse', { title: '教务信息管理系统——教师选课' });
});

//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editXk.html', function(req, res, next) {
    res.render('selectcourse/_editXk', {
        _layoutFile: false,
        title: '教务信息管理系统——教师选课',
        kcid:req.query.kcid,
        surts:req.query.surts
    });

});

//添保存教师选择头数信息
router.post('/saveXk', function (req, res, next) {
    var jskcid = req.body.jskcid;   //作为更新使用
    var kcid = req.body.kcid;       //课程ID
    var jsid = req.body.jsid;       //教师ID
    var ts = req.body.ts;           //头数
    var bz = req.body.bz;           //备注
    var czr = req.body.czr;        //教师名称
    var term = req.body.term;       //学期
    if(jskcid == 0){
        //添加头数信息
        kc_jsDao.xuanzets(req, res, kcid, jsid, ts, bz, czr, term, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                res.send({"result":0});
            }
        });
    }else{
        //修改头数信息
        kc_jsDao.xiugaits(req, res, ts, bz, jskcid, function (result) {
            if (result) {
                //成功则返回数据库修改行数
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败返回0
                res.send({"result":0});
            }
        });
    }
});



module.exports = router;