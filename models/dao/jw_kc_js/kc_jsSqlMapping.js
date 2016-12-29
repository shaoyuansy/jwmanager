/**
 * Created by sy on 2016/11/1.
 */
// CRUD SQL语句
var kc_js = {
    insert: "INSERT INTO jw_kc_js SET KCID=?,JSID=?,TS=?,BZ=?,CZR=?;",
    insertChg: "UPDATE jw_kc_js SET KCID=?,JSID=?,TS=?,BZ=?,CZR=? WHERE ID=?;",
    update: "UPDATE jw_kc_js SET TS=?,BZ=? WHERE KCID=? AND JSID=? AND CZR=?;",
    queryYN: "SELECT kj.TS,js.XM,kj.BZ FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.KCID=? AND kj.JSID=js.ID AND js.SFZR='是';",
    queryWP: "SELECT kj.TS,js.XM,kj.BZ,kj.CZR FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.KCID=? AND kj.JSID=js.ID AND js.SFZR='否';",
    queryXk: "SELECT js.XM,kj.KCID,kj.JSID,kj.TS,kj.BZ FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.JSID=js.ID AND KCID=? AND CZR=?;",
    deleteXk: "DELETE FROM jw_kc_js WHERE KCID=? AND JSID=?;",
    exztXk: "SELECT ID FROM jw_kc_js WHERE JSID=? AND KCID=?;"
};
module.exports = kc_js;