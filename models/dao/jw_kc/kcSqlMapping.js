/**
 * Created by peng on 2016/9/26.
 */
// CRUD SQL语句
var zy = {
    delete: 'DELETE FROM jw_kc WHERE ID=?',
    queryAll: 'SELECT * FROM jw_kc ORDER BY ID ASC',
    queryOne: 'SELECT * FROM jw_kc WHERE ID=?',
    insert:'INSERT INTO jw_kc SET KCBH=?,KCMC=?,KCYWMC=?,KCFZR=?,KCLX=?,ZXS=?,SJXS=?,XF=?,SYDX=?,XDKC=?,HXKC=?',
    update:'UPDATE jw_kc SET KCBH=?,KCMC=?,KCYWMC=?,KCFZR=?,KCLX=?,ZXS=?,SJXS=?,XF=?,SYDX=?,XDKC=?,HXKC=? WHERE ID=?',
};
module.exports = zy;