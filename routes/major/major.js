/**
 * Created by peng on 2016/9/26.
 */
var express = require('express');
var router = express.Router();
var zyDao = require('../../models/dao/jw_zy/zyDao');
var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/major.html', function(req, res, next) {
    res.render('major/major', { title: '教务信息管理系统——专业管理' });
});
//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editMajor.html', function(req, res, next) {
    var jysStr = "";
    jysDao.queryAll(req, res, function(jysResult){
        if (jysResult.length > 0) {
            for (var i = 0; i < jysResult.length; i++) {
                jysStr += "<option value='" + jysResult[i].JYSMC + "'>" + jysResult[i].JYSMC + "</option>";
            }
        }
        if(req.query.id == 0){
            res.render('major/_editMajor', {
                _layoutFile: false,
                title: '教务信息管理系统——专业管理',
                id:0,
                zybh:"",
                zymc:"",
                ssjys:"",
                ksnj:"",
                bjgs:"",
                gbdyrs:"",
                ssjysmc:jysStr
            });
        }else{
            zyDao.queryListById(req, res, req.query.id, function(result) {
                res.render('major/_editMajor', {
                    _layoutFile: false,
                    title: '教务信息管理系统——专业管理',
                    id:result[0].ID,
                    zybh:result[0].ZYBH,
                    zymc:result[0].ZYMC,
                    ssjys:result[0].SSJYS,
                    ksnj:result[0].KSNJ,
                    bjgs:result[0].BJGS,
                    gbdyrs:result[0].GBDYRS,
                    ssjysmc:jysStr
                });
            });
        }
    })

});
//编辑信息
router.post('/_editMajor.html', function (req, res, next) {
    var id = req.body.ID;             //ID
    var zybh = req.body.ZYBH;           //专业编号
    var zymc = req.body.ZYMC;           //专业名称
    var ssjys = req.body.SSJYS;           //所属教研室
    var ksnj = req.body.KSNJ;           //开设年级
    var bjgs = req.body.BJGS;           //班级个数
    var gbdyrs = req.body.GBDYRS;           //各班大约人数
    var sqlArr;    //字段数组
    if(id==0){
        sqlArr = [zybh,zymc,ssjys,ksnj,bjgs,gbdyrs];
        //编辑专业信息
        zyDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }else{
        sqlArr = [zybh,zymc,ssjys,ksnj,bjgs,gbdyrs,id];
        //编辑专业信息
        zyDao.update(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }

});
//获取专业所有开设年级，取消重复
router.get('/_getKsnj.html', function(req, res, next) {
    zyDao.queryKsnj(req, res, function (result) {
        res.send({"result":result});
    });
});
//获取专业所有专业，取消重复
router.get('/_getZymc.html', function(req, res, next) {
    zyDao.queryAll(req, res, function (result) {
        res.send({"result":result});
    });
});
//获取专业所有专业，取消重复
router.get('/_getZyId.html', function(req, res, next) {
    zyDao.queryZyId(req, res, req.query.sqlStr, function (result) {
        res.send({"result":result});
    });
});
module.exports = router;
