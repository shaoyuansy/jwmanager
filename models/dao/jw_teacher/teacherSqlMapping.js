/**
 * Created by sy on 2016/9/21.
 */

var teacher = {
    queryAll: 'SELECT ID,XM,GH,LXDH,FGFZR,ZYJSZC,XL,ZGXW,XKLB,DSLX,DWMC,JXXG,FJ' +
    ' FROM jw_teacher ORDER BY ID ASC',
    queryById: 'SELECT * FROM jw_teacher WHERE ID=?',
    insert: 'INSERT INTO jw_teacher SET XM=?,GH=?,XB=?,CSNY=?,LXDH=?,JYSDM=?,FGFZR=?,RXSJ=?,SFZHM=?,MZ=?,ZC=?,' +
    'DZSJ=?,RZZT=?,DWH=?,DWMC=?,GZDWLB=?,XL=?,ZGXW=?,ZY=?,BYSJ=?,BYYX=?,XY=?,ZYJSZC=?,XKLB=?,SFWSSX=?,SFJYGCBJ=?,' +
    'SFJYHYBJ=?,DSLX=?,DQ=?,KSKC=?,CSDKSJ=?,JXXG=?,SFSJSFZFYJ=?,SFSJBYZFYJ=?,SFSJXWZFYJ=?,SFSJZCZFYJ=?,SFSJJSZGZFYJ=?,' +
    'SFSJGZZFYJ=?,SFSJXYS=?,FJ=?;',
    update: 'UPDATE jw_teacher SET XM=?,GH=?,XB=?,CSNY=?,LXDH=?,JYSDM=?,FGFZR=?,RXSJ=?,SFZHM=?,MZ=?,ZC=?,' +
    'DZSJ=?,RZZT=?,DWH=?,DWMC=?,GZDWLB=?,XL=?,ZGXW=?,ZY=?,BYSJ=?,BYYX=?,XY=?,ZYJSZC=?,XKLB=?,SFWSSX=?,SFJYGCBJ=?,' +
    'SFJYHYBJ=?,DSLX=?,DQ=?,KSKC=?,CSDKSJ=?,JXXG=?,SFSJSFZFYJ=?,SFSJBYZFYJ=?,SFSJXWZFYJ=?,SFSJZCZFYJ=?,SFSJJSZGZFYJ=?,' +
    'SFSJGZZFYJ=?,SFSJXYS=?,FJ=? WHERE ID=?;',
    delete: 'DELETE FROM jw_teacher WHERE ID=?;'
};
module.exports = teacher;