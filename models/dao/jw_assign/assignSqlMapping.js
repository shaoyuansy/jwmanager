/**
 * Created by sy on 2016/12/12.
 */

var assign = {
    queryAll: 'SELECT jw_kc.KCMC,jw_teacher.XM,jw_kc.ID as KCID,jw_teacher.ID as JSID,jw_kc.KCFZR,jw_kc_js.TS from jw_kc_js,jw_kc,jw_teacher where jw_kc_js.KCID=jw_kc.ID and jw_kc_js.JSID=jw_teacher.ID;',
    queryStr: 'select KCMC,XM,ZYMC,KSNJ,BJGS from jw_kc_js,jw_kc,jw_teacher,jw_zy_kc,jw_zy where jw_kc_js.KCID=jw_kc.ID and jw_kc_js.JSID=jw_teacher.ID and jw_kc_js.KCID=jw_zy_kc.KCID and jw_zy_kc.ZYID=jw_zy.ID and KCMC=? and XM=?;',
    queryStrnjbj: 'select KCMC,XM,ZYMC,KSNJ,BJGS from jw_kc_js,jw_kc,jw_teacher,jw_zy_kc,jw_zy where jw_kc_js.KCID=jw_kc.ID and jw_kc_js.JSID=jw_teacher.ID and jw_kc_js.KCID=jw_zy_kc.KCID and jw_zy_kc.ZYID=jw_zy.ID and KCMC=? and XM=? and ZYMC=?;',
    querySave: 'INSERT INTO jw_assign SET JSID=?,KCID=?,SSZY=?,SSNJ=?,SSBJ=?,BJRS=?,SKSJ=?,SKDD=?,SFWSJK=?,SFDSZ=?,WPJSPJ=?;'
};
module.exports = assign;