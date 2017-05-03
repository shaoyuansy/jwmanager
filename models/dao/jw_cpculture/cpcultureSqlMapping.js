var cpculture = {
    queryAll:'SELECT * FROM jw_cpculture WHERE SSNJ=?;',
    existCulture: 'SELECT ID FROM jw_cpculture WHERE ZJMC=? AND KS=? AND ZKT=? AND SJ=? AND SSNJ=? AND SSZY=? AND SSBJ=? AND SKSJ=? AND SKDD=?;',
    assignCulture: 'INSERT INTO jw_cpculture SET ZJMC=?,KS=?,ZKT=?,SJ=?,SSNJ=?,SSZY=?,SSBJ=?,SKSJ=?,SKDD=?,SKJS=?;'
};
module.exports = cpculture;