var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var xl = require('node-xlrd');
var zyDao = require('../../models/dao/jw_zy/zyDao');
var kcDao = require('../../models/dao/jw_kc/kcDao');
var zy_kcDao = require('../../models/dao/jw_zy_kc/zy_kcDao');

router.get('/major_course.html', function (req, res, next) {
    res.render('major_course/major_course', {
        title: '教务信息管理系统——专业-课程管理',
        sqlStr: "",
        box_title: ""
    });
});

router.get('/addCourse.html', function (req, res, next) {
    var sqlStr = decodeURI(req.query.data,"UTF-8");
    res.render('major_course/majorAddCourse', {
        title: '教务信息管理系统——专业-课程添加',
        sqlStr: sqlStr
    });
});

router.post('/insertSome', function (req, res, next) {
    zy_kcDao.insertSome(req, res, req.body.insertStr, function (result) {
        if (result && result.affectedRows>0) {
            res.send({"success":true,"data":""});
        }else{
            res.send({"success":false,"errorMassage":"插入数据失败，请检查内容是否为空"});
        }
    });
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
                var arr = [];
                for(var sIdx = 0; sIdx < shtCount; sIdx++ ){
                    if(bk.sheet.loaded(sIdx)){ // 加载成功
                        var tableFormat = ["专业名称","开设年级","开设学期","课程名称"];
                        var sht = bk.sheets[sIdx],
                        rCount = sht.row.count,
                        cCount = sht.column.count;
                        if(cCount != 4){
                            res.send({"success":false,"errorMassage":"文件列有误，应为：专业名称,开设年级,开设学期,课程名称"});
                            return;
                        }
                        for(var rIdx = 0; rIdx < rCount; rIdx++){
                            arr[rIdx] = [];
                            if(rIdx == 0 ){
                                for(var cIdx = 0; cIdx < cCount; cIdx++){
                                    if(sht.cell(rIdx,cIdx) != tableFormat[cIdx]){
                                        res.send({"success":false,"errorMassage":"文件列有误，应为：专业名称,开设年级,开设学期,课程名称"});
                                        return;
                                    }else{
                                        arr[rIdx].push(sht.cell(rIdx,cIdx));
                                    }
                                }
                            }
                            if(rIdx != 0 ){
                                for(var cIdx = 0; cIdx < cCount; cIdx++){
                                    arr[rIdx].push(sht.cell(rIdx,cIdx));
                                }
                            }
                        }
                        res.send({"success":true,"data":arr});
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
            })
        }  
    });
});
module.exports = router;
