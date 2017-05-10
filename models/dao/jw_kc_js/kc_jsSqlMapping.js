var kc_js = {
    insert: "INSERT INTO jw_kc_js SET KCID=?,JSID=?,TS=?,BZ=?,CZR=?,TERM=?;",
    update: "UPDATE jw_kc_js SET TS=?,BZ=? WHERE ID=?;",
    queryTc: "SELECT js.XM,js.SFZR,kj.* FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.KCID=? AND kj.JSID=js.ID AND kj.TERM=?;",
    queryWP: "SELECT kj.TS,js.XM,kj.BZ,kj.CZR FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.KCID=? AND kj.JSID=js.ID AND js.SFZR='否';",
    queryXk: "SELECT kj.ID,js.XM,js.SFZR,kj.KCID,kj.JSID,kj.TS,kj.BZ,kj.CZR FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.JSID=js.ID AND KCID=? AND CZR=? AND TERM=?;",
    adminqueryXk:"SELECT kj.ID,js.XM,js.SFZR,kj.KCID,kj.JSID,kj.TS,kj.BZ,kj.CZR FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.JSID=js.ID AND KCID=? AND TERM=?;",
    deleteXk: "DELETE FROM jw_kc_js WHERE ID=?;",
    deleteKc: "DELETE FROM jw_kc_js WHERE KCID=?;",
    exztXk: "SELECT ID FROM jw_kc_js WHERE JSID=? AND KCID=? AND TERM=?;"
};
module.exports = kc_js;