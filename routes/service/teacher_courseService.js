/**
 * Created by sy on 2016/11/1.
 */
var express = require('express');
var router = express.Router();
var kc_jsDao = require('../../models/dao/jw_kc_js/kc_jsDao');

//获取院内教师-课程信息列表
router.get('/getYN', function (req, res, next) {
    kc_jsDao.getYN(req, res, req.query.kcid,function (result) {
        res.send({"result": result});
    });
});
//获取外聘教师-课程信息列表
router.get('/getWP', function (req, res, next) {
    kc_jsDao.getWP(req, res, req.query.kcid,function (result) {
        res.send({"result": result});
    });
});

module.exports = router;