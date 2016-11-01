/**
 * Created by sy on 2016/11/1.
 */
// CRUD SQL语句
var kc_js = {
    queryYN:"SELECT KCID,JSID,TS,JSXM,JSLY,BZ FROM jw_kc_js WHERE KCID=? AND JSLY='院内';",
    queryWP:"SELECT KCID,JSID,TS,JSXM,JSLY,BZ FROM jw_kc_js WHERE KCID=? AND JSLY='外聘';"
};
module.exports = kc_js;