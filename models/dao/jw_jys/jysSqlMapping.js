/**
 * Created by peng on 2016/9/20.
 */
// CRUD SQL语句
var wdgl = {
    //delete: 'DELETE FROM t_jcbm_jylc_wdglzd WHERE CO_ID=?',
    queryAll: 'SELECT * FROM jw_jys ORDER BY ID ASC',
    //queryOne: 'SELECT wg.*,WDLXMC FROM t_jcbm_jylc_wdglzd AS wg Left Join t_jcbm_jylc_wdlxzd AS wx ON wg.WDLXDM=wx.WDLXDM WHERE wg.CO_ID=?',
    //insert:'INSERT INTO t_jcbm_jylc_wdglzd SET WDLXDM=?,GJZ=?,BTMC=?,JYMS=?,WDNR=?,YHXM=?,XGSJ=?,TJSJ=?',
    //update:'UPDATE t_jcbm_jylc_wdglzd SET WDLXDM=?,GJZ=?,BTMC=?,JYMS=?,WDNR=?,YHXM=?,XGSJ=? WHERE CO_ID=?',
};
module.exports = wdgl;