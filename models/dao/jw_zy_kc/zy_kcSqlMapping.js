/**
 * Created by sy on 2016/9/27.
 */
// CRUD SQL语句
var zy_kc = {
    delete: 'DELETE FROM jw_zy_kc WHERE ID=?;',
    queryAll: 'SELECT DISTINCT *,zk.ID AS ZKID FROM jw_zy_kc AS zk,jw_zy AS zy,jw_kc AS kc WHERE zk.ZYID=zy.ID AND zk.KCID=kc.ID AND zy.KSNJ like ? AND zy.ZYMC like ? ORDER BY zk.ID ASC;',
    queryOne: 'SELECT * FROM jw_zy_kc WHERE ID=?;',
    queryMC: 'SELECT * FROM jw_zy_kc;',
    insert: 'INSERT INTO jw_zy_kc SET ZYID=?,KCID=?,KSXQ=?;',
    update: 'UPDATE jw_zy_kc SET ZYID=?,KCID=?,KSXQ=? WHERE ID=?;',
};
module.exports = zy_kc;