var graproject = {
    queryAll: 'SELECT jw_graproject.ID,jw_zy.ID AS ZYID,jw_zy.ZYMC,jw_zy.KSNJ,jw_graproject.RS,jw_teacher.XM AS JSXM,jw_teacher.ID AS JSID FROM jw_graproject,jw_zy ,jw_teacher WHERE jw_graproject.ZYID = jw_zy.ID AND jw_graproject.JSID = jw_teacher.ID AND jw_zy.KSNJ=?;',
    exGra:'SELECT * FROM jw_graproject WHERE ZYID=? AND JSID=?;',
    delete: "DELETE FROM jw_graproject WHERE ID=?;",
    insert: 'INSERT INTO jw_graproject SET ZYID=?,JSID=?,RS=?;',
    update: 'UPDATE jw_graproject SET ZYID=?,JSID=?,RS=? WHERE ID=?;'
};
module.exports = graproject;