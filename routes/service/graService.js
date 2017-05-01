var express = require('express');
var router = express.Router();
var graprojectDao = require('../../models/dao/jw_graproject/graprojectDao');

//获取信息列表
router.get('/getList', function (req, res, next) {
    var term = decodeURI(req.query.TERM,"UTF-8");
    graprojectDao.queryAll(req, res, term, function (result) {
        res.send({"data": result});
    });
});
//验证是否重复记录
router.post('/exGra', function (req, res, next) {
    graprojectDao.exGra(req, res, req.body.ZYID, req.body.JSID, function (result) {
        res.send({"data": result});
    });
});
//添加一条教研室信息记录
router.post('/addGra', function (req, res, next) {
    graprojectDao.insertGra(req, res, req.body.ZYID, req.body.JSID, req.body.RS, function (result) {
        res.send({"state": result});
    });
});
//更新一条教研室信息记录
router.post('/editGra', function (req, res, next) {
    graprojectDao.updateGra(req, res, req.body.ZYID, req.body.JSID, req.body.RS, req.body.ID, function (result) {
        res.send({"state": result});
    });
});
//删除一条教研室信息记录
router.post('/delOne', function (req, res, next) {
    graprojectDao.delete(req, res, req.body.ID, function (result) {
        res.send({"state": result});
    });
});
//批量删除教研室信息记录
router.post('/delSome', function (req, res, next) {
    graprojectDao.deleteSome(req, res, req.body.idstr, function (result) {
        res.send({"state": result});
    });
});

module.exports = router;