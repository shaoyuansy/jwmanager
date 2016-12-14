/**
 * Created by sy on 2016/12/12.
 */

var assign = {
    queryAll: 'SELECT jw_kc_js.KCID,jw_kc_js.JSID,jw_assign.SSZY,jw_assign.SSNJ,jw_assign.SSBJ,jw_assign.BJRS,jw_assign.SKSJ,jw_teacher.XM,jw_kc.KCMC,jw_kc.KCFZR FROM jw_kc_js LEFT JOIN jw_assign ON jw_kc_js.KCID = jw_assign.KCID AND jw_kc_js.JSID = jw_assign.JSID ,jw_teacher ,jw_kc WHERE jw_teacher.ID = jw_kc_js.JSID AND jw_kc.ID = jw_kc_js.KCID;',
    queryStr: 'select KCMC,XM,ZYMC,KSNJ,BJGS from jw_kc_js,jw_kc,jw_teacher,jw_zy_kc,jw_zy where jw_kc_js.KCID=jw_kc.ID and jw_kc_js.JSID=jw_teacher.ID and jw_kc_js.KCID=jw_zy_kc.KCID and jw_zy_kc.ZYID=jw_zy.ID and KCMC=? and XM=?;',
    queryStrnjbj: 'select KCMC,XM,ZYMC,KSNJ,BJGS from jw_kc_js,jw_kc,jw_teacher,jw_zy_kc,jw_zy where jw_kc_js.KCID=jw_kc.ID and jw_kc_js.JSID=jw_teacher.ID and jw_kc_js.KCID=jw_zy_kc.KCID and jw_zy_kc.ZYID=jw_zy.ID and KCMC=? and XM=? and ZYMC=?;',
    querySave: 'INSERT INTO jw_assign SET JSID=?,KCID=?,SSZY=?,SSNJ=?,SSBJ=?,BJRS=?,SKSJ=?,SKDD=?,SFWSJK=?,SFDSZ=?,WPJSPJ=?;'
};
module.exports = assign;