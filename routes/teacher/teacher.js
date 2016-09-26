/**
 * Created by sy on 2016/9/20.
 */
var express = require('express');
var router = express.Router();
var teacherDao = require('../../models/dao/jw_teacher/teacherDao');

/* GET teacher page. */
router.get('/', function(req, res, next) {
    res.render('teacher/teacher', {
        title: '教师信息管理'
    });
});

//编辑信息--若是更新信息则在编辑页面显示信息
router.get('/_editTeacher.html', function(req, res, next) {
    if(req.query.id == 0){
        res.render('teacher/_editteacher', {
            _layoutFile: false,
            id:0,
            xm:"",
            gh:"",
            xb:"",
            csny:"",
            lxdh:"",
            jysmc:"",
            fgfzr:"",
            rxsj:"",
            sfzhm:"",
            mz:"",
            zc:"",
            dzsj:"",
            rzzt:"",
            dwh:"",
            dwmc:"",
            gzdwlb:"",
            xl:"",
            zgxw:"",
            zy:"",
            bysj:"",
            byyx:"",
            xy:"",
            zyjszc:"",
            xklb:"",
            sfwssx:"",
            sfjygcbj:"",
            sfjyhybj:"",
            dslx:"",
            dq:"",
            kskc:"",
            csdksj:"",
            jxxg:"",
            sfsjsfzfyj:"",
            sfsjbyzfyj:"",
            sfsjxwzfyj:"",
            sfsjzczfyj:"",
            sfsjjszgzfyj:"",
            sfsjgzzfyj:"",
            sfsjxys:"",
            fj:""
        });
    }else{
        teacherDao.queryById(req, res, req.query.id, function(result) {
            res.render('teacher/_editteacher', {
                _layoutFile: false,
                id:result[0].ID,
                xm:result[0].XM,
                gh:result[0].GH,
                xb:result[0].XB,
                csny:result[0].CSNY,
                lxdh:result[0].LXDH,
                jysmc:result[0].JYSMC,
                fgfzr:result[0].FGFZR,
                rxsj:result[0].RXSJ,
                sfzhm:result[0].SFZHM,
                mz:result[0].MZ,
                zc:result[0].ZC,
                dzsj:result[0].DZSJ,
                rzzt:result[0].RZZT,
                dwh:result[0].DWH,
                dwmc:result[0].DWMC,
                gzdwlb:result[0].GZDWLB,
                xl:result[0].XL,
                zgxw:result[0].ZGXW,
                zy:result[0].ZY,
                bysj:result[0].BYSJ,
                byyx:result[0].BYYX,
                xy:result[0].XY,
                zyjszc:result[0].ZYJSZC,
                xklb:result[0].XKLB,
                sfwssx:result[0].SFWSSX,
                sfjygcbj:result[0].SFJYGCBJ,
                sfjyhybj:result[0].SFJYHYBJ,
                dslx:result[0].DSLX,
                dq:result[0].DQ,
                kskc:result[0].KSKC,
                csdksj:result[0].CSDKSJ,
                jxxg:result[0].JXXG,
                sfsjsfzfyj:result[0].SFSJSFZFYJ,
                sfsjbyzfyj:result[0].SFSJBYZFYJ,
                sfsjxwzfyj:result[0].SFSJXWZFYJ,
                sfsjzczfyj:result[0].SFSJZCZFYJ,
                sfsjjszgzfyj:result[0].SFSJJSZGZFYJ,
                sfsjgzzfyj:result[0].SFSJGZZFYJ,
                sfsjxys:result[0].SFSJXYS,
                fj:result[0].FJ
            });
        });
    }
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
    var zc = req.body.ZC;
    var dzsj = req.body.DZSJ;
    var rzzt = req.body.RZZT;
    var dwh = req.body.DWH;
    var dwmc = req.body.DWMC;
    var gzdwlb = req.body.GZDWLB;
    var xl = req.body.XL;
    var zgxw = req.body.ZGXW;
    var zy = req.body.ZY;
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
    if(id==0){
        sqlArr = [xm,gh,xb,csny,lxdh,jysmc,fgfzr,rxsj,sfzhm,mz,zc,dzsj,rzzt,dwh,dwmc,gzdwlb,xl,zgxw,zy,bysj,byyx,xy,
            zyjszc,xklb,sfwssx,sfjygcbj,sfjyhybj,dslx,dq,kskc,csdksj,jxxg,sfsjsfzfyj,sfsjbyzfyj,sfsjxwzfyj,sfsjzczfyj,
            sfsjjszgzfyj,sfsjgzzfyj,sfsjxys,fj];

        teacherDao.insert(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }else{
        sqlArr = [xm,gh,xb,csny,lxdh,jysmc,fgfzr,rxsj,sfzhm,mz,zc,dzsj,rzzt,dwh,dwmc,gzdwlb,xl,zgxw,zy,bysj,byyx,xy,
            zyjszc,xklb,sfwssx,sfjygcbj,sfjyhybj,dslx,dq,kskc,csdksj,jxxg,sfsjsfzfyj,sfsjbyzfyj,sfsjxwzfyj,sfsjzczfyj,
            sfsjjszgzfyj,sfsjgzzfyj,sfsjxys,fj,id];
        //编辑调度命令
        teacherDao.update(req, res, sqlArr, function (result) {
            if (result) {
                res.send({"result":result.affectedRows});
            } else {
                //编辑失败
                res.send({"result":0});
            }
        });
    }

});

/* GET _exportTeacher page. */
router.get('/_exportTeacher', function(req, res, next) {
    res.render('teacher/_exportTeacher', {
        idstr : req.query.IDstr,
        title: '教师信息管理-教师资料导出预览'
    });
});


module.exports = router;
