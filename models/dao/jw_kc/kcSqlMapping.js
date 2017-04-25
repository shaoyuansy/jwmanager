var kc = {
    delete: 'DELETE FROM jw_kc WHERE ID=?',
    queryAll: 'SELECT * FROM jw_kc ORDER BY ID ASC',
    queryOne: 'SELECT * FROM jw_kc WHERE ID=?',
    insert: 'INSERT INTO jw_kc SET KCBH=?,KCMC=?,KCYWMC=?,KCFZR=?,KCLX=?,ZXS=?,SJXS=?,XF=?,SYDX=?,XDKC=?,HXKC=?,JYSHF=?,ZYFZR=?',
    update: 'UPDATE jw_kc SET KCBH=?,KCMC=?,KCYWMC=?,KCFZR=?,KCLX=?,ZXS=?,SJXS=?,XF=?,SYDX=?,XDKC=?,HXKC=?,JYSHF=?,ZYFZR=? WHERE ID=?',
    queryKcId: 'SELECT * FROM jw_kc WHERE KCMC=?;',
    queryByzy: 'SELECT * FROM jw_kc WHERE SYDX = "所有专业" OR SYDX =? ORDER BY ID ASC;'
};
module.exports = kc;