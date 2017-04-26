var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var xl = require('node-xlrd');
var kcDao = require('../../models/dao/jw_kc/kcDao');
var jysDao = require('../../models/dao/jw_jys/jysDao');

//超链接跳转
router.get('/course.html', function (req, res, next) {
    res.render('course/course', {title: '教务信息管理系统——专业管理'});
});
//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editCourse.html', function (req, res, next) {
    var jysStr = "";
    jysDao.queryAll(req, res, function (jysResult) {
        if (jysResult.length > 0) {
            for (var i = 0; i < jysResult.length; i++) {
                jysStr += "<option value='" + jysResult[i].JYSMC + "'>" + jysResult[i].JYSMC + "</option>";
            }
        }
        if (req.query.id == 0) {
            res.render('course/_editCourse', {
                _layoutFile: false,
                title: '教务信息管理系统——课程管理',
                id: 0,
                kcbh: "",
                kcmc: "",
                kcywmc: "",
                kcfzr: "",
                kclx: "",
                zxs: "",
                sjxs: "",
                xf: "",
                sydx: "",
                xdkc: "",
                hxkc: "",
                jyshf: "",
                zyfzr: "",
                jyscode: jysStr
            });
        } else {
            kcDao.queryListById(req, res, req.query.id, function (result) {
                res.render('course/_editCourse', {
                    _layoutFile: false,
                    title: '教务信息管理系统——课程管理',
                    id: result[0].ID,
                    kcbh: result[0].KCBH,
                    kcmc: result[0].KCMC,
                    kcywmc: result[0].KCYWMC,
                    kcfzr: result[0].KCFZR,
                    kclx: result[0].KCLX,
                    zxs: result[0].ZXS,
                    sjxs: result[0].SJXS,
                    xf: result[0].XF,
                    sydx: result[0].SYDX,
                    xdkc: result[0].XDKC,
                    hxkc: result[0].HXKC,
                    jyshf: result[0].JYSHF,
                    zyfzr: result[0].ZYFZR,
                    jyscode: jysStr
                });
            });
        }
    });


});
//编辑信息
router.post('/_editCourse.html', function (req, res, next) {
    var id = req.body.ID;             //ID
    var kcbh = req.body.KCBH;           //课程编号
    var kcmc = req.body.KCMC;           //课程名称
    var kcywmc = req.body.KCYWMC;           //课程英文名称
    var kcfzr = req.body.KCFZR;           //课程负责人
    var kclx = req.body.KCLX;           //课程类型
    var zxs = req.body.ZXS;           //周学时
    var sjxs = req.body.SJXS;           //上机学时
    var xf = req.body.XF;           //学分
    var sydx = req.body.SYDX;           //使用对象
    var xdkc = req.body.XDKC;           //先导课程
    var hxkc = req.body.HXKC;           //后续课程
    var jyshf = req.body.JYSHF;           //所属教研室
    var zyfzr = req.body.ZYFZR;           //专业负责人
    var sqlArr;    //字段数组
    if (id == 0) {
        sqlArr = [kcbh, kcmc, kcywmc, kcfzr, kclx, zxs, sjxs, xf, sydx, xdkc, hxkc, jyshf, zyfzr];
        //编辑课程信息
        kcDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result": result.affectedRows});
            } else {
                //编辑失败
                res.send({"result": 0});
            }
        });
    } else {
        sqlArr = [kcbh, kcmc, kcywmc, kcfzr, kclx, zxs, sjxs, xf, sydx, xdkc, hxkc, jyshf, zyfzr, id];
        //编辑调度命令
        kcDao.update(req, res, sqlArr, function (result) {
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
                        var tableFormat = ["课程编号","课程名称","课程英文名称","教研室划分","专业负责人","课程负责人","课程类型","周学时","上机学时","学分","适用对象","先导课程","后续课程"]
                        var sht = bk.sheets[sIdx],
                        rCount = sht.row.count,
                        cCount = sht.column.count;
                        if(cCount != 13){
                            res.send({"success":false,"errorMassage":"文件列有误，应为：课程编号,课程名称,课程英文名称,教研室划分,专业负责人,课程负责人,课程类型,周学时,上机学时,学分,适用对象,先导课程,后续课程"});
                            return;
                        }
                        var sqlStr = 'INSERT INTO jw_kc (KCBH,KCMC,KCYWMC,JYSHF,ZYFZR,KCFZR,KCLX,ZXS,SJXS,XF,SYDX,XDKC,HXKC) VALUES ';
                        var valueStr = '';
                        for(var rIdx = 0; rIdx < rCount; rIdx++){
                            valueStr += '(';
                            for(var cIdx = 0; cIdx < cCount; cIdx++){
                                if(rIdx == 0 ){
                                    if(sht.cell(rIdx,cIdx) != tableFormat[cIdx]){
                                        res.send({"success":false,"errorMassage":"文件列有误，应为：课程编号,课程名称,课程英文名称,教研室划分,专业负责人,课程负责人,课程类型,周学时,上机学时,学分,适用对象,先导课程,后续课程"});
                                        return;
                                    }
                                    valueStr = '';
                                }
                                if(rIdx != 0){
                                    try{
                                        cIdx == 12 ? valueStr +=  '"'+sht.cell(rIdx,cIdx) + '"),' : valueStr +=  '"'+sht.cell(rIdx,cIdx) + '",';
                                    }catch(e){
                                        console.log(e.message);
                                    }
                                }
                            }
                        }
                        valueStr = valueStr.substr(0, valueStr.length - 1);
                        kcDao.insertSome(req, res, sqlStr+valueStr, function (result) { //批量插入数据库
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

//获取课程ID
router.post('/getKcId', function (req, res, next) {
    kcDao.queryKcId(req, res, req.body.kcmc, function (result) {
        res.send({"result": result});
    });
});
module.exports = router;