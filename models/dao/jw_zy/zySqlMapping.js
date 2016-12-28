/**
 * Created by peng on 2016/9/26.
 */
// CRUD SQL语句
var zy = {
    delete: 'DELETE FROM jw_zy WHERE ID=?',
    queryAll: 'SELECT zy.ID,zy.ZYBH,zy.ZYMC,zy.SSJYS,jys.JYSZR,zy.KSNJ,zy.BJGS,zy.GBDYRS ' +
    'FROM jw_zy AS zy LEFT JOIN jw_jys AS jys ON zy.SSJYS=jys.JYSMC ORDER BY zy.ID ASC',
    queryOne: 'SELECT * FROM jw_zy WHERE ID=?',
    insert:'INSERT INTO jw_zy SET ZYBH=?,ZYMC=?,SSJYS=?,KSNJ=?,BJGS=?,GBDYRS=?',
    update:'UPDATE jw_zy SET ZYBH=?,ZYMC=?,SSJYS=?,KSNJ=?,BJGS=?,GBDYRS=? WHERE ID=?',
    ksnj:'SELECT DISTINCT KSNJ FROM jw_zy ORDER BY KSNJ DESC',//开设年级
    queryZyId: 'SELECT * FROM jw_zy WHERE KSNJ like ? AND ZYMC like ?',//由开设年纪和专业名称获取专业信息
};
module.exports = zy;