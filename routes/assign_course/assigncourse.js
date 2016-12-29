/**
 * Created by sy on 2016/12/15.
 */
var express = require('express');
var router = express.Router();
var assignDao = require('../../models/dao/jw_assign/assignDao');

//路由到授课管理
router.get('/', function (req, res, next) {
    res.render('assign_course/assigncourse', {title: '教务信息管理系统——授课管理'});
});

//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editAssign.html', function (req, res, next) {
    var jsStr = "";
    assignDao.queryJS(req, res, function (jsResult) {
        if (jsResult.length > 0) {
            for (var i = 0; i < jsResult.length; i++) {
                jsStr += "<option value='" + jsResult[i].XM + "'>" + jsResult[i].XM + "</option>";
            }
        }
        if (req.query.id == 0) {
            res.render('assign_course/_editassign', {
                _layoutFile: false,
                id: 0,
                jsStr: jsStr,
                jsxm: "",
                sskc: "",
                kcfzr: "",
                sszy: "",
                ssnj: "",
                ssbj: "",
                bjrs: "",
                sksj: "",
                skdd: "",
                sfwsjk: "",
                sfdsz: "",
                wpjspj: "",
                bz: ""
            });
        } else {
            assignDao.queryById(req, res, req.query.id, function (result) {
                res.render('assign_course/_editassign', {
                    _layoutFile: false,
                    id: result[0].ID,
                    jsStr: jsStr,
                    jsxm: result[0].JSXM,
                    sskc: result[0].KCMC,
                    kcfzr: result[0].KCFZR,
                    sszy: result[0].SSZY,
                    ssnj: result[0].SSNJ,
                    ssbj: result[0].SSBJ,
                    bjrs: result[0].BJRS,
                    sksj: result[0].SKSJ,
                    skdd: result[0].SKDD,
                    sfwsjk: result[0].SFWSJK,
                    sfdsz: result[0].SFDSZ,
                    wpjspj: result[0].WPJSPJ,
                    bz: result[0].BZ
                });
            });
        }
    });
});
//保存编辑信息
router.post('/_editAssign.html', function (req, res, next) {
    var id = req.body.ID;
    var jsxm = req.body.JSXM;
    var sskc = req.body.SSKC;
    var kcfzr = req.body.KCFZR;
    var sszy = req.body.SSZY;
    var ssnj = req.body.SSNJ;
    var ssbj = req.body.SSBJ;
    var bjrs = req.body.BJRS;
    var sksj = req.body.SKSJ;
    var skdd = req.body.SKDD;
    var sfwsjk = req.body.SFWSJK;
    var sfdsz = req.body.SFDSZ;
    var wpjspj = req.body.WPJSPJ;
    var sqlArr;    //字段数组
    if (id == 0) {
        sqlArr = [jsxm, sskc, kcfzr, sszy, ssnj, ssbj, bjrs, sksj, skdd, sfwsjk, sfdsz, wpjspj];
        //新建授课信息保存
        assignDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result": result.affectedRows});
            } else {
                //编辑失败
                res.send({"result": 0});
            }
        });
    } else {
        sqlArr = [jsxm, sskc, kcfzr, sszy, ssnj, ssbj, bjrs, sksj, skdd, sfwsjk, sfdsz, wpjspj, id];
        console.log(sqlArr);
        //编辑授课信息保存
        assignDao.update(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result": result.affectedRows});
            } else {
                //编辑失败
                res.send({"result": 0});
            }
        });
    }

});


module.exports = router;
