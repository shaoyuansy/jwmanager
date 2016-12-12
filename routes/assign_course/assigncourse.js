/**
 * Created by peng on 2016/9/20.
 */
var express = require('express');
var router = express.Router();
var zyDao = require('../../models/dao/jw_zy/zyDao');

//路由到授课管理
router.get('/', function(req, res, next) {
    var zyStr = "";
    var njStr = "";
    zyDao.queryAll(req, res, function(zyResult) {
        if(zyResult.length > 0){
            for (var i = 0; i < zyResult.length; i++) {
                zyStr += "<option value='" + zyResult[i].ZYMC + "'>" + zyResult[i].ZYMC + "</option>";
                njStr += "<option value='" + zyResult[i].KSNJ + "'>" + zyResult[i].KSNJ + "</option>";
            }
        }
        res.render('assign_course/assigncourse', {
            title: '教务信息管理系统——授课管理',
            zyStr:zyStr,
            njStr:njStr
        });
    });
});

module.exports = router;
