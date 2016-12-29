/**
 * Created by peng on 2016/9/27.
 */
var express = require('express');
var router = express.Router();
var zyDao = require('../../models/dao/jw_zy/zyDao');
var kcDao = require('../../models/dao/jw_kc/kcDao');
var zy_kcDao = require('../../models/dao/jw_zy_kc/zy_kcDao');
//超链接跳转
router.get('/major_course.html', function (req, res, next) {
    res.render('major_course/major_course', {
        title: '教务信息管理系统——专业-课程管理',
        sqlStr: "",
        box_title: ""
    });
});

//
router.get('/getData.html', function (req, res, next) {
    var sqlStr = req.query.ksnj + "," + req.query.zymc;
    res.render('major_course/major_course', {
        title: '教务信息管理系统——专业-课程管理',
        sqlStr: sqlStr,
        box_title: req.query.ksnj + "-" + req.query.zymc + "专业 课程信息"
    });
});

//
router.get('/addCourse.html', function (req, res, next) {
    var sqlStr = req.query.data;
    res.render('major_course/majorAddCourse', {
        title: '教务信息管理系统——专业-课程添加',
        sqlStr: sqlStr,
    });
});
//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editMajorCourse.html', function (req, res, next) {
    var kcStr = "";
    kcDao.queryAll(req, res, function (kcResult) {
        if (kcResult.length > 0) {
            for (var i = 0; i < kcResult.length; i++) {
                kcStr += "<option value='" + kcResult[i].ID + "'>" + kcResult[i].KCMC + "</option>";
            }
        }
        zy_kcDao.queryListById(req, res, req.query.id, function (result) {
            res.render('major_course/_editMajor_course', {
                _layoutFile: false,
                title: '教务信息管理系统——专业-课程修改',
                id: result[0].ID,
                zyid: result[0].ZYID,
                kcid: result[0].KCID,
                ksxq: result[0].KSXQ,
                kccode: kcStr
            });
        });
    })

});
//编辑信息
router.post('/_editMajorCourse.html', function (req, res, next) {
    var id = req.body.ID;             //ID
    var zyid = req.body.ZYID;           //专业ID
    var kcid = req.body.KCID;           //课程ID
    var ksxq = req.body.KSXQ;           //开设学期
    var sqlArr;    //字段数组
    sqlArr = [zyid, kcid, ksxq, id];
    //编辑专业信息
    zy_kcDao.update(req, res, sqlArr, function (result) {
        if (result) {
            res.send({"result": result.affectedRows});
        } else {
            //编辑失败
            res.send({"result": 0});
        }
    });

});
module.exports = router;
