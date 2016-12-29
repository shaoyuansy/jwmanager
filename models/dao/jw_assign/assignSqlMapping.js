/**
 * Created by sy on 2016/12/12.
 */

var assign = {
    queryAll: 'SELECT jw_assign.ID,JSXM,jw_kc.KCMC,SSZY,SSNJ,SSBJ,BJRS,SKSJ,SKDD,SFWSJK,SFDSZ,WPJSPJ,jw_kc.KCFZR ' +
    'FROM jw_assign ,jw_kc WHERE jw_kc.KCMC = jw_assign.KCMC;',
    querybyid: 'SELECT jw_assign.ID,jw_assign.JSXM,jw_assign.KCMC,jw_assign.KCFZR,jw_assign.SSZY,jw_assign.SSNJ,' +
    'jw_assign.SSBJ,jw_assign.BJRS,jw_assign.SKSJ,jw_assign.SKDD,jw_assign.SFWSJK,jw_assign.SFDSZ,jw_assign.WPJSPJ,' +
    'jw_kc_js.BZ,jw_teacher.SFZR FROM jw_assign ,jw_kc_js ,jw_kc ,jw_teacher WHERE jw_kc_js.JSID = jw_teacher.ID AND ' +
    'jw_kc_js.KCID = jw_kc.ID AND jw_assign.JSXM = jw_teacher.XM AND jw_kc.KCMC = jw_assign.KCMC AND jw_assign.ID=?;',
    queryJS: 'SELECT DISTINCT jw_teacher.XM FROM jw_teacher,jw_kc_js WHERE jw_kc_js.JSID = jw_teacher.ID;',
    delete: "DELETE FROM jw_assign WHERE ID=?;",
    querykcStr: 'SELECT jw_kc.KCMC,jw_kc.KCFZR,jw_teacher.SFZR FROM jw_kc ,jw_teacher ,jw_kc_js ' +
    'WHERE jw_kc_js.KCID = jw_kc.ID AND jw_kc_js.JSID = jw_teacher.ID AND jw_teacher.XM =?;',
    queryzyStr: 'SELECT jw_zy.ZYMC,jw_zy.KSNJ,jw_zy.BJGS FROM jw_teacher ,jw_kc_js ,jw_kc ,jw_zy_kc ,jw_zy ' +
    'WHERE jw_teacher.ID = jw_kc_js.JSID AND jw_kc.ID = jw_kc_js.KCID AND jw_kc.ID = jw_zy_kc.KCID AND ' +
    'jw_zy_kc.ZYID = jw_zy.ID AND jw_teacher.XM=? AND jw_kc.KCMC=?;',
    querynjbjStr: 'SELECT jw_zy.ZYMC,jw_zy.KSNJ,jw_zy.BJGS FROM jw_teacher ,jw_kc_js ,jw_kc ,jw_zy_kc ,jw_zy ' +
    'WHERE jw_teacher.ID = jw_kc_js.JSID AND jw_kc.ID = jw_kc_js.KCID AND jw_kc.ID = jw_zy_kc.KCID AND ' +
    'jw_zy_kc.ZYID = jw_zy.ID AND jw_teacher.XM=? AND jw_kc.KCMC=? AND ZYMC=?;',
    queryfzrStr: 'SELECT KCFZR FROM jw_kc WHERE KCMC=?;',
    insert: 'INSERT INTO jw_assign SET JSXM=?,KCMC=?,KCFZR=?,SSZY=?,SSNJ=?,SSBJ=?,BJRS=?,SKSJ=?,SKDD=?,SFWSJK=?,SFDSZ=?,WPJSPJ=?;',
    insertSome: 'INSERT INTO jw_assign SET JSXM=?,KCMC=?,KCFZR=?,SSZY=?,SSNJ=?,SSBJ=?,BJRS=?,SKSJ=?,SKDD=?,SFWSJK=?,SFDSZ=?,WPJSPJ=?',
    update: 'UPDATE jw_assign SET JSXM=?,KCMC=?,KCFZR=?,SSZY=?,SSNJ=?,SSBJ=?,BJRS=?,SKSJ=?,SKDD=?,SFWSJK=?,SFDSZ=?,WPJSPJ=? WHERE ID=?;'
};
module.exports = assign;