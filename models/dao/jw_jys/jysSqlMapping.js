/**
 * Created by peng on 2016/9/20.
 */
// CRUD SQL语句
var jys = {
    delete: 'DELETE FROM jw_jys WHERE ID=?',
    queryAll: 'SELECT * FROM jw_jys ORDER BY ID ASC',
    queryOne: 'SELECT * FROM jw_jys WHERE ID=?',
    insert: 'INSERT INTO jw_jys SET JYSBH=?,JYSMC=?,JYSZR=?',
    update: 'UPDATE jw_jys SET JYSBH=?,JYSMC=?,JYSZR=? WHERE ID=?',
};
module.exports = jys;