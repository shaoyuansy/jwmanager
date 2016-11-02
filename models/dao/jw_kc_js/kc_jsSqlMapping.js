/**
 * Created by sy on 2016/11/1.
 */
// CRUD SQL语句
var kc_js = {
    insert:"INSERT INTO jw_kc_js SET KCID=?,JSID=?,TS=?,BZ=?;",
    queryYN:"SELECT kj.TS,js.XM,kj.BZ FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.KCID=? AND kj.JSID=js.ID AND js.SFZR='是';",
    queryWP:"SELECT kj.TS,js.XM,kj.BZ FROM jw_kc_js AS kj,jw_teacher AS js WHERE kj.KCID=? AND kj.JSID=js.ID AND js.SFZR='否';"
};
module.exports = kc_js;