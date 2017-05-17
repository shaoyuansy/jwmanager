var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var xl = require('node-xlrd');
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');
var jysDao = require('../../models/dao/jw_jys/jysDao');

router.get('/teacher.html', function (req, res, next) {
    res.render('teacher/teacher', {title: '教务信息管理系统——教研室管理'});
});

//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editTeacher.html', function (req, res, next) {
    var jysStr = "";
    jysDao.queryAll(req, res, function (jysResult) {
        if (jysResult.length > 0) {
            for (var i = 0; i < jysResult.length; i++) {
                jysStr += "<option value='" + jysResult[i].JYSMC + "'>" + jysResult[i].JYSMC + "</option>";
            }
        }
        if (req.query.id == 0) {
            res.render('teacher/_editteacher', {
                _layoutFile: false,
                id: 0,
                xm: "",
                gh: "",
                xb: "",
                csny: "",
                lxdh: "",
                jysmc: "",
                jysStr: jysStr,
                fgfzr: "",
                rxsj: "",
                sfzhm: "",
                mz: "",
                dzsj: "",
                rzzt: "",
                dwh: "",
                dwmc: "",
                gzdwlb: "",
                xl: "",
                zgxw: "",
                sfzr: "",
                bysj: "",
                byyx: "",
                xy: "",
                zyjszc: "",
                xklb: "",
                sfwssx: "",
                sfjygcbj: "",
                sfjyhybj: "",
                dslx: "",
                dq: "",
                kskc: "",
                csdksj: "",
                jxxg: "",
                sfsjsfzfyj: "",
                sfsjbyzfyj: "",
                sfsjxwzfyj: "",
                sfsjzczfyj: "",
                sfsjjszgzfyj: "",
                sfsjgzzfyj: "",
                sfsjxys: "",
                fj: ""
            });
        } else {
            teacherDao.queryById(req, res, req.query.id, function (result) {
                res.render('teacher/_editteacher', {
                    _layoutFile: false,
                    id: result[0].ID,
                    xm: result[0].XM,
                    gh: result[0].GH,
                    xb: result[0].XB,
                    csny: result[0].CSNY,
                    lxdh: result[0].LXDH,
                    jysmc: result[0].JYSMC,
                    jysStr: jysStr,
                    fgfzr: result[0].FGFZR,
                    rxsj: result[0].RXSJ,
                    sfzhm: result[0].SFZHM,
                    mz: result[0].MZ,
                    dzsj: result[0].DZSJ,
                    rzzt: result[0].RZZT,
                    dwh: result[0].DWH,
                    dwmc: result[0].DWMC,
                    gzdwlb: result[0].GZDWLB,
                    xl: result[0].XL,
                    zgxw: result[0].ZGXW,
                    sfzr: result[0].SFZR,
                    bysj: result[0].BYSJ,
                    byyx: result[0].BYYX,
                    xy: result[0].XY,
                    zyjszc: result[0].ZYJSZC,
                    xklb: result[0].XKLB,
                    sfwssx: result[0].SFWSSX,
                    sfjygcbj: result[0].SFJYGCBJ,
                    sfjyhybj: result[0].SFJYHYBJ,
                    dslx: result[0].DSLX,
                    dq: result[0].DQ,
                    kskc: result[0].KSKC,
                    csdksj: result[0].CSDKSJ,
                    jxxg: result[0].JXXG,
                    sfsjsfzfyj: result[0].SFSJSFZFYJ,
                    sfsjbyzfyj: result[0].SFSJBYZFYJ,
                    sfsjxwzfyj: result[0].SFSJXWZFYJ,
                    sfsjzczfyj: result[0].SFSJZCZFYJ,
                    sfsjjszgzfyj: result[0].SFSJJSZGZFYJ,
                    sfsjgzzfyj: result[0].SFSJGZZFYJ,
                    sfsjxys: result[0].SFSJXYS,
                    fj: result[0].FJ
                });
            });
        }
    });
});

//编辑信息
router.post('/_editTeacher.html', function (req, res, next) {
    var id = req.body.ID;
    var xm = req.body.XM;
    var gh = req.body.GH;
    var xb = req.body.XB;
    var csny = req.body.CSNY;
    var lxdh = req.body.LXDH;
    var jysmc = req.body.JYSMC;
    var fgfzr = req.body.FGFZR;
    var rxsj = req.body.RXSJ;
    var sfzhm = req.body.SFZHM;
    var mz = req.body.MZ;
    var dzsj = req.body.DZSJ;
    var rzzt = req.body.RZZT;
    var dwh = req.body.DWH;
    var dwmc = req.body.DWMC;
    var gzdwlb = req.body.GZDWLB;
    var xl = req.body.XL;
    var zgxw = req.body.ZGXW;
    var sfzr = req.body.SFZR;
    var bysj = req.body.BYSJ;
    var byyx = req.body.BYYX;
    var xy = req.body.XY;
    var zyjszc = req.body.ZYJSZC;
    var xklb = req.body.XKLB;
    var sfwssx = req.body.SFWSSX;
    var sfjygcbj = req.body.SFJYGCBJ;
    var sfjyhybj = req.body.SFJYHYBJ;
    var dslx = req.body.DSLX;
    var dq = req.body.DQ;
    var kskc = req.body.KSKC;
    var csdksj = req.body.CSDKSJ;
    var jxxg = req.body.JXXG;
    var sfsjsfzfyj = req.body.SFSJSFZFYJ;
    var sfsjbyzfyj = req.body.SFSJBYZFYJ;
    var sfsjxwzfyj = req.body.SFSJXWZFYJ;
    var sfsjzczfyj = req.body.SFSJZCZFYJ;
    var sfsjjszgzfyj = req.body.SFSJJSZGZFYJ;
    var sfsjgzzfyj = req.body.SFSJGZZFYJ;
    var sfsjxys = req.body.SFSJXYS;
    var fj = req.body.FJ;

    var sqlArr;    //字段数组
    if (id == 0) {
        sqlArr = [xm, gh, xb, csny, lxdh, jysmc, fgfzr, rxsj, sfzhm, mz, dzsj, rzzt, dwh, dwmc, gzdwlb, xl, zgxw, sfzr, bysj, byyx, xy,
            zyjszc, xklb, sfwssx, sfjygcbj, sfjyhybj, dslx, dq, kskc, csdksj, jxxg, sfsjsfzfyj, sfsjbyzfyj, sfsjxwzfyj, sfsjzczfyj,
            sfsjjszgzfyj, sfsjgzzfyj, sfsjxys, fj];
        teacherDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result": result.affectedRows});
            } else {
                //编辑失败
                res.send({"result": 0});
            }
        });
    } else {
        sqlArr = [xm, gh, xb, csny, lxdh, jysmc, fgfzr, rxsj, sfzhm, mz, dzsj, rzzt, dwh, dwmc, gzdwlb, xl, zgxw, sfzr, bysj, byyx, xy,
            zyjszc, xklb, sfwssx, sfjygcbj, sfjyhybj, dslx, dq, kskc, csdksj, jxxg, sfsjsfzfyj, sfsjbyzfyj, sfsjxwzfyj, sfsjzczfyj,
            sfsjjszgzfyj, sfsjgzzfyj, sfsjxys, fj, id];
        //编辑调度命令
        teacherDao.update(req, res, sqlArr, function (result) {
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
                        var tableFormat = ["工号","姓名","性别","出生年月","民族","身份证号码","联系电话","所属教研室","入校时间","分管负责人","定职时间","任职状态","单位号","单位名称",
                            "工作单位类别","学历","最高学位","是否专任","毕业时间","毕业院校","学缘","专业技术职称","学科类别","导师类型","地区","可授课程","在我院初始代课时间","教学效果",
                            "是否为双师型","是否具有工程背景","是否具有行业背景","身份证复印件","工作证复印件","教师资格证复印件","学位证复印件","毕业证复印件","职称证复印件","协议书"]
                        var sht = bk.sheets[sIdx],
                        rCount = sht.row.count,
                        cCount = sht.column.count;
                        if(cCount != 38){
                            res.send({"success":false,"errorMassage":"文件列格式有误，请仔细检查"});
                            return;
                        }
                        var sqlStr = 'INSERT INTO jw_teacher (GH,XM,XB,CSNY,MZ,SFZHM,LXDH,JYSMC,RXSJ,FGFZR,DZSJ,RZZT,DWH,DWMC,GZDWLB,XL,ZGXW,SFZR,BYSJ,BYYX,XY,ZYJSZC,XKLB,'+
                                     'DSLX,DQ,KSKC,CSDKSJ,JXXG,SFWSSX,SFJYGCBJ,SFJYHYBJ,SFSJSFZFYJ,SFSJGZZFYJ,SFSJJSZGZFYJ,SFSJXWZFYJ,SFSJBYZFYJ,SFSJZCZFYJ,SFSJXYS) VALUES ';
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
                                        cIdx == 37 ? valueStr +=  '"'+sht.cell(rIdx,cIdx) + '"),' : valueStr +=  '"'+sht.cell(rIdx,cIdx) + '",';
                                    }catch(e){
                                        console.log(e.message);
                                    }
                                }
                            }
                        }
                        valueStr = valueStr.substr(0, valueStr.length - 1);
                        teacherDao.insertSome(req, res, sqlStr+valueStr, function (result) { //批量插入数据库
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

/* 导出预览 */
router.get('/_exportTeacher.html', function (req, res, next) {
    res.render('teacher/_exportTeacher', {
        idstr: req.query.IDstr,
        title: '教务信息管理系统——教师资料导出预览'
    });
});


module.exports = router;
