/**
 * Created by peng on 2016/9/20.
 */
var express = require('express');
var router = express.Router();
var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/jys.html', function(req, res, next) {
    res.render('jys/jiaoyanshi', { title: '教务信息管理系统——教研室管理' });
});
//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editJys.html', function(req, res, next) {
    if(req.query.id == 0){
        res.render('jys/_editJys', {
            _layoutFile: false,
            title: '教务信息管理系统——教研室管理',
            id:0,
            jysbh:"",
            jysmc:"",
            jyszr:""
        });
    }else{
        jysDao.queryListById(req, res, req.query.id, function(result) {
            res.render('jys/_editJys', {
                _layoutFile: false,
                title: '教务信息管理系统——教研室管理',
                id:result[0].ID,
                jysbh:result[0].JYSBH,
                jysmc:result[0].JYSMC,
                jyszr:result[0].JYSZR
            });
        });
    }
});
//编辑信息
router.post('/_editJys.html', function (req, res, next) {
    var id = req.body.ID;             //ID
    var jysbh = req.body.JYSBH;
    var jysmc = req.body.JYSMC;
    var jyszr = req.body.JYSZR;
    var sqlArr;    //字段数组
    if(id==0){
        sqlArr = [jysbh,jysmc,jyszr];

        //编辑调度命令
        jysDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }else{
        sqlArr = [jysbh,jysmc,jyszr,id];
        //编辑调度命令
        jysDao.update(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }

});

module.exports = router;
