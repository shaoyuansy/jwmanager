var teacher = {
    queryAll: 'SELECT jw_teacher.ID,jw_teacher.XM,jw_teacher.GH,jw_teacher.SFZR,jw_teacher.LXDH,jw_teacher.FGFZR,jw_teacher.ZYJSZC,'+
        'jw_teacher.XL,jw_teacher.ZGXW,jw_teacher.XKLB,jw_teacher.DSLX,jw_teacher.DWMC,jw_teacher.JXXG,jw_teacher.FJ,jw_user.RULE '+
        'FROM jw_teacher LEFT JOIN jw_user on XM = USERNAME ORDER BY ID DESC;',
    queryById: 'SELECT * FROM jw_teacher WHERE ID=?;',
    queryZR: 'SELECT ID,XM FROM jw_teacher WHERE SFZR="学院教师";',
    queryByMc: "SELECT ID,XM,SFZR FROM jw_teacher WHERE XM=?;",
    queryZRteacher: "SELECT jw_teacher.SFZR FROM jw_teacher WHERE XM=?;",
    queryTeacher: "SELECT ID FROM jw_teacher WHERE XM=?;",
    insert: 'INSERT INTO jw_teacher SET XM=?,GH=?,XB=?,CSNY=?,LXDH=?,JYSMC=?,FGFZR=?,RXSJ=?,SFZHM=?,MZ=?,' +
    'DZSJ=?,RZZT=?,DWH=?,DWMC=?,GZDWLB=?,XL=?,ZGXW=?,SFZR=?,BYSJ=?,BYYX=?,XY=?,ZYJSZC=?,XKLB=?,SFWSSX=?,SFJYGCBJ=?,' +
    'SFJYHYBJ=?,DSLX=?,DQ=?,KSKC=?,CSDKSJ=?,JXXG=?,SFSJSFZFYJ=?,SFSJBYZFYJ=?,SFSJXWZFYJ=?,SFSJZCZFYJ=?,SFSJJSZGZFYJ=?,' +
    'SFSJGZZFYJ=?,SFSJXYS=?,FJ=?;',
    insertWP: "INSERT INTO jw_teacher SET XM=?,SFZR=?;",
    update: 'UPDATE jw_teacher SET XM=?,GH=?,XB=?,CSNY=?,LXDH=?,JYSMC=?,FGFZR=?,RXSJ=?,SFZHM=?,MZ=?,' +
    'DZSJ=?,RZZT=?,DWH=?,DWMC=?,GZDWLB=?,XL=?,ZGXW=?,SFZR=?,BYSJ=?,BYYX=?,XY=?,ZYJSZC=?,XKLB=?,SFWSSX=?,SFJYGCBJ=?,' +
    'SFJYHYBJ=?,DSLX=?,DQ=?,KSKC=?,CSDKSJ=?,JXXG=?,SFSJSFZFYJ=?,SFSJBYZFYJ=?,SFSJXWZFYJ=?,SFSJZCZFYJ=?,SFSJJSZGZFYJ=?,' +
    'SFSJGZZFYJ=?,SFSJXYS=?,FJ=? WHERE ID=?;',
    delete: 'DELETE FROM jw_teacher WHERE ID=?;'
};
module.exports = teacher;