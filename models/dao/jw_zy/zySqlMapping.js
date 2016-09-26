/**
 * Created by peng on 2016/9/26.
 */
// CRUD SQL语句
var zy = {
    delete: 'DELETE FROM jw_zy WHERE ID=?',
    queryAll: 'SELECT * FROM jw_zy ORDER BY ID ASC',
    queryOne: 'SELECT * FROM jw_zy WHERE ID=?',
    insert:'INSERT INTO jw_zy SET ZYBH=?,ZYMC=?,SSJYS=?,KSNJ=?,BJGS=?,GBDYRS=?',
    update:'UPDATE jw_zy SET ZYBH=?,ZYMC=?,SSJYS=?,KSNJ=?,BJGS=?,GBDYRS=? WHERE ID=?',
};
module.exports = zy;