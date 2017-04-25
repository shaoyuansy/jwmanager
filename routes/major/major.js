var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var xl = require('node-xlrd');
var zyDao = require('../../models/dao/jw_zy/zyDao');
var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/major.html', function (req, res, next) {
    res.render('major/major', {title: '教务信息管理系统——专业管理'});
});
//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editMajor.html', function (req, res, next) {
    var jysStr = "";
    jysDao.queryAll(req, res, function (jysResult) {
        if (jysResult.length > 0) {
            for (var i = 0; i < jysResult.length; i++) {
                jysStr += "<option value='" + jysResult[i].JYSMC + "'>" + jysResult[i].JYSMC + "</option>";
            }
        }
        if (req.query.id == 0) {
            res.render('major/_editMajor', {
                _layoutFile: false,
                title: '教务信息管理系统——专业管理',
                id: 0,
                zybh: "",
                zymc: "",
                ssjys: "",
                ksnj: "",
                bjgs: "",
                gbdyrs: "",
                ssjysmc: jysStr
            });
        } else {
            zyDao.queryListById(req, res, req.query.id, function (result) {
                res.render('major/_editMajor', {
                    _layoutFile: false,
                    title: '教务信息管理系统——专业管理',
                    id: result[0].ID,
                    zybh: result[0].ZYBH,
                    zymc: result[0].ZYMC,
                    ssjys: result[0].SSJYS,
                    ksnj: result[0].KSNJ,
                    bjgs: result[0].BJGS,
                    gbdyrs: result[0].GBDYRS,
                    ssjysmc: jysStr
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
    if (id == 0) {
        sqlArr = [zybh, zymc, ssjys, ksnj, bjgs, gbdyrs];
        //编辑专业信息
        zyDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result": result.affectedRows});
            } else {
                //编辑失败
                res.send({"result": 0});
            }
        });
    } else {
        sqlArr = [zybh, zymc, ssjys, ksnj, bjgs, gbdyrs, id];
        //编辑专业信息
        zyDao.update(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result": result.affectedRows});
            } else {
                //编辑失败
                res.send({"result": 0});
            }
        });
    }
});

/* 解析excal */
router.post('/readExcel', function (req, res, next) {
    var form = new multiparty.Form({ //生成multiparty对象，并配置上传目标路径
        uploadDir: './public/temps/'
    }); 
    form.parse(req, function (err, fields, files) { //上传完成后处理
        var filesTmp = JSON.stringify(files);
        if (err) {
            res.send({"success":false,"errorMassage":"文件上传失败"+err});
        } else if(files.file){
            var tempPath = path.join(__dirname,'../../'+files.file[0].path);
            let fix = /\.[^\.]+/.exec(files.file[0].path);
            if(fix[0] != ".xls"){
                res.send({"success":false,"errorMassage":"文件格式错误(只能上传xls格式的文件)"});
                return;
            }
            if(files.file[0].size >= 4194304 ){
                res.send({"success":false,"errorMassage":"文件不能超过4MB"});
                return;
            }
            xl.open(tempPath, function(err,bk){ //开始解析
                if(err) { 
                    res.send({"success":false,"errorMassage":err.message});
                    return;
                }
                var shtCount = bk.sheet.count;
                for(var sIdx = 0; sIdx < shtCount; sIdx++ ){
                    if(bk.sheet.loaded(sIdx)){ // 加载成功
                        var tableFormat = ["专业编号","专业名称","所属教研室","开设年级","班级个数","各班大约人数"]
                        var sht = bk.sheets[sIdx],
                        rCount = sht.row.count,
                        cCount = sht.column.count;
                        if(cCount != 6){
                            res.send({"success":false,"errorMassage":"文件列有误，应为：专业编号,专业名称,所属教研室,开设年级,班级个数,各班大约人数"});
                            return;
                        }
                        var sqlStr = 'INSERT INTO jw_zy (ZYBH,ZYMC,SSJYS,KSNJ,BJGS,GBDYRS) VALUES ';
                        var valueStr = '';
                        for(var rIdx = 0; rIdx < rCount; rIdx++){
                            valueStr += '(';
                            for(var cIdx = 0; cIdx < cCount; cIdx++){
                                if(rIdx == 0 ){
                                    if(sht.cell(rIdx,cIdx) != tableFormat[cIdx]){
                                        res.send({"success":false,"errorMassage":"文件列有误，应为：专业编号,专业名称,所属教研室,开设年级,班级个数,各班大约人数"});
                                        return;
                                    }
                                    valueStr = '';
                                }
                                if(rIdx != 0){
                                    try{
                                        cIdx == 5 ? valueStr +=  '"'+sht.cell(rIdx,cIdx) + '"),' : valueStr +=  '"'+sht.cell(rIdx,cIdx) + '",';
                                    }catch(e){
                                        console.log(e.message);
                                    }
                                }
                            }
                        }
                        valueStr = valueStr.substr(0, valueStr.length - 1);
                        zyDao.insertSome(req, res, sqlStr+valueStr, function (result) { //批量插入数据库
                            if (result && result.affectedRows>0) {
                                res.send({"success":true,"data":""});
                            }else{
                                res.send({"success":false,"errorMassage":"插入数据失败，请检查内容是否为空"});
                            }
                        });
                    }else{
                        res.send({"success":false,"errorMassage":"文件加载失败，请重新上传"});
                    }
                }
            });
        }
        if(tempPath){
            fs.unlink(tempPath, function(err){
                if(err){
                    throw err;
                }
                //console.log('delete:'+tempPath+'success');
            })
        }  
    });
});

//获取专业所有开设年级，取消重复
router.post('/_getKsnj.html', function (req, res, next) {
    zyDao.queryKsnj(req, res, function (result) {
        res.send({"result": result});
    });
});
//获取专业名称
router.post('/_getZymc.html', function (req, res, next) {
    zyDao.queryZybyxn(req, res, req.query.xn, function (result) {
        res.send({"result": result});
    });
});

module.exports = router;
