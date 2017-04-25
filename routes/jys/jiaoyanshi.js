var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var xl = require('node-xlrd');
var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/jys.html', function (req, res, next) {
    res.render('jys/jiaoyanshi', {title: '教务信息管理系统——教研室管理'});
});
//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editJys.html', function (req, res, next) {
    if (req.query.id == 0) {
        res.render('jys/_editJys', {
            _layoutFile: false,
            title: '教务信息管理系统——教研室管理',
            id: 0,
            jysbh: "",
            jysmc: "",
            jyszr: ""
        });
    } else {
        jysDao.queryListById(req, res, req.query.id, function (result) {
            res.render('jys/_editJys', {
                _layoutFile: false,
                title: '教务信息管理系统——教研室管理',
                id: result[0].ID,
                jysbh: result[0].JYSBH,
                jysmc: result[0].JYSMC,
                jyszr: result[0].JYSZR
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
    if (id == 0) {
        sqlArr = [jysbh, jysmc, jyszr];

        //编辑调度命令
        jysDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result": result.affectedRows});
            } else {
                //编辑失败
                res.send({"result": 0});
            }
        });
    } else {
        sqlArr = [jysbh, jysmc, jyszr, id];
        //编辑调度命令
        jysDao.update(req, res, sqlArr, function (result) {
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
                        var tableFormat = ["教研室编号","教研室名称","教研室主任"]
                        var sht = bk.sheets[sIdx],
                        rCount = sht.row.count,
                        cCount = sht.column.count;
                        if(cCount != 3){
                            res.send({"success":false,"errorMassage":"文件列格式有误，请仔细检查"});
                            return;
                        }
                        var sqlStr = 'INSERT INTO jw_jys (JYSBH,JYSMC,JYSZR) VALUES ';
                        var valueStr = '';
                        for(var rIdx = 0; rIdx < rCount; rIdx++){
                            valueStr += '(';
                            for(var cIdx = 0; cIdx < cCount; cIdx++){
                                if(rIdx == 0 ){
                                    if(sht.cell(rIdx,cIdx) != tableFormat[cIdx]){
                                        res.send({"success":false,"errorMassage":"文件列内容有误，请仔细检查"});
                                        return;
                                    }
                                    valueStr = '';
                                }
                                if(rIdx != 0){
                                    try{
                                        cIdx == 2 ? valueStr +=  '"'+sht.cell(rIdx,cIdx) + '"),' : valueStr +=  '"'+sht.cell(rIdx,cIdx) + '",';
                                    }catch(e){
                                        console.log(e.message);
                                    }
                                }
                            }
                        }
                        valueStr = valueStr.substr(0, valueStr.length - 1);
                        jysDao.insertSome(req, res, sqlStr+valueStr, function (result) { //批量插入数据库
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

module.exports = router;
