var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var xl = require('node-xlrd');
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
    var term = req.body.TERM;
    var sqlArr;    //字段数组
    if (id == 0) {
        sqlArr = [jsxm, sskc, kcfzr, sszy, ssnj, ssbj, bjrs, sksj, skdd, sfwsjk, sfdsz, wpjspj, term];
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
        sqlArr = [jsxm, sskc, kcfzr, sszy, ssnj, ssbj, bjrs, sksj, skdd, sfwsjk, sfdsz, wpjspj, term, id];
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

/* 解析excal */
router.post('/readExcel', function (req, res, next) {
    var form = new multiparty.Form({ //生成multiparty对象，并配置上传目标路径
        uploadDir: './public/temps/'
    }); 
    form.parse(req, function (err, fields, files) { //上传完成后处理
        var term = fields.term[0];
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
                        var tableFormat = ["教师姓名","所授课程","课程负责人","所授专业","所授年级","所授班级","班级人数","上课时间","上课地点","是否上机","是否单双周","外聘教师评价"]
                        var sht = bk.sheets[sIdx],
                        rCount = sht.row.count,
                        cCount = sht.column.count;
                        if(cCount != 12){
                            res.send({"success":false,"errorMassage":"文件列有误，应为：教师姓名,所授课程,课程负责人,所授专业,所授年级,所授班级,班级人数,上课时间,上课地点,是否上机,是否单双周,外聘教师评价"});
                            return;
                        }
                        var sqlStr = 'INSERT INTO jw_assign (JSXM,KCMC,KCFZR,SSZY,SSNJ,SSBJ,BJRS,SKSJ,SKDD,SFWSJK,SFDSZ,WPJSPJ,TERM) VALUES ';
                        var valueStr = '';
                        for(var rIdx = 0; rIdx < rCount; rIdx++){
                            valueStr += '(';
                            for(var cIdx = 0; cIdx < cCount; cIdx++){
                                if(rIdx == 0 ){
                                    if(sht.cell(rIdx,cIdx) != tableFormat[cIdx]){
                                        res.send({"success":false,"errorMassage":"文件列有误，应为：教师姓名,所授课程,课程负责人,所授专业,所授年级,所授班级,班级人数,上课时间,上课地点,是否上机,是否单双周,外聘教师评价"});
                                        return;
                                    }
                                    valueStr = '';
                                }
                                if(rIdx != 0){
                                    try{
                                        cIdx == 11 ? valueStr +=  '"'+sht.cell(rIdx,cIdx) +'","' + term +'"),' : valueStr +=  '"'+sht.cell(rIdx,cIdx) + '",';
                                    }catch(e){
                                        console.log(e.message);
                                    }
                                }
                            }
                        }
                        valueStr = valueStr.substr(0, valueStr.length - 1);
                        assignDao.insertSome(req, res, sqlStr+valueStr, function (result) { //批量插入数据库
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
