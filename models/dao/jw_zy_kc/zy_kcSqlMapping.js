/**
 * Created by sy on 2016/9/27.
 */
// CRUD SQL语句
var zy_kc = {
    delete: 'DELETE FROM jw_zy_kc WHERE ID=?;',
    queryRepeat:'SELECT ID FROM jw_zy_kc WHERE ZYID=? AND KCID=? AND KSXQ=?;',
    queryAll: 'SELECT DISTINCT *,zk.ID AS ZKID FROM jw_zy_kc AS zk,jw_zy AS zy,jw_kc AS kc WHERE zk.ZYID=zy.ID AND zk.KCID=kc.ID AND zy.KSNJ like ? AND zy.ZYMC like ? ORDER BY zk.ID ASC;',
    queryOne: 'SELECT * FROM jw_zy_kc WHERE ID=?;',
    insert: 'INSERT INTO jw_zy_kc SET ZYID=?,KCID=?,KSXQ=?;',
    update: 'UPDATE jw_zy_kc SET KSXQ=? WHERE ID=?;',
};
module.exports = zy_kc;