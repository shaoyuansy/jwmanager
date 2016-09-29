/**
 * Created by peng on 2016/9/26.
 */
var express = require('express');
var router = express.Router();
var kcDao = require('../../models/dao/jw_kc/kcDao');
var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/course.html', function(req, res, next) {
    res.render('course/course', { title: '教务信息管理系统——专业管理' });
});
//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editCourse.html', function(req, res, next) {
    var jysStr = "";
    jysDao.queryAll(req, res, function(jysResult) {
        if (jysResult.length > 0) {
            for (var i = 0; i < jysResult.length; i++) {
                jysStr += "<option value='" + jysResult[i].JYSMC + "'>" + jysResult[i].JYSMC + "</option>";
            }
        }
        if(req.query.id == 0){
            res.render('course/_editCourse', {
                _layoutFile: false,
                title: '教务信息管理系统——课程管理',
                id:0,
                kcbh:"",
                kcmc:"",
                kcywmc:"",
                kcfzr:"",
                kclx:"",
                zxs:"",
                sjxs:"",
                xf:"",
                sydx:"",
                xdkc:"",
                hxkc:"",
                jyshf:"",
                zyfzr:"",
                jyscode:jysStr
            });
        }else {
            kcDao.queryListById(req, res, req.query.id, function (result) {
                res.render('course/_editCourse', {
                    _layoutFile: false,
                    title: '教务信息管理系统——课程管理',
                    id: result[0].ID,
                    kcbh: result[0].KCBH,
                    kcmc: result[0].KCMC,
                    kcywmc: result[0].KCYWMC,
                    kcfzr: result[0].KCFZR,
                    kclx: result[0].KCLX,
                    zxs: result[0].ZXS,
                    sjxs: result[0].SJXS,
                    xf: result[0].XF,
                    sydx: result[0].SYDX,
                    xdkc: result[0].XDKC,
                    hxkc: result[0].HXKC,
                    jyshf: result[0].JYSHF,
                    zyfzr: result[0].ZYFZR,
                    jyscode:jysStr
                });
            });
        }
    });


});
//编辑信息
router.post('/_editCourse.html', function (req, res, next) {
    var id = req.body.ID;             //ID
    var kcbh = req.body.KCBH;           //课程编号
    var kcmc = req.body.KCMC;           //课程名称
    var kcywmc = req.body.KCYWMC;           //课程英文名称
    var kcfzr = req.body.KCFZR;           //课程负责人
    var kclx = req.body.KCLX;           //课程类型
    var zxs = req.body.ZXS;           //周学时
    var sjxs = req.body.SJXS;           //上机学时
    var xf = req.body.XF;           //学分
    var sydx = req.body.SYDX;           //使用对象
    var xdkc = req.body.XDKC;           //先导课程
    var hxkc = req.body.HXKC;           //后续课程
    var jyshf = req.body.JYSHF;           //所属教研室
    var zyfzr = req.body.ZYFZR;           //专业负责人
    var sqlArr;    //字段数组
    if(id==0){
        sqlArr = [kcbh,kcmc,kcywmc,kcfzr,kclx,zxs,sjxs,xf,sydx,xdkc,hxkc,jyshf,zyfzr];
        //编辑课程信息
        kcDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }else{
        sqlArr = [kcbh,kcmc,kcywmc,kcfzr,kclx,zxs,sjxs,xf,sydx,xdkc,hxkc,jyshf,zyfzr,id];
        //编辑调度命令
        kcDao.update(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }

});
//由课程名称获取课程ID
router.get('/_getKcId.html', function(req, res, next) {
    console.log("-----"+req.query.sqlStr);
    kcDao.queryKcId(req, res, req.query.sqlStr, function (result) {
        res.send({"result":result});
    });
});
module.exports = router;