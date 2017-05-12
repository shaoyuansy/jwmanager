var user = {
    adduser:'INSERT INTO jw_user SET USERNAME=?,PASSWORD=?,YHBH=0,RULE=0;',
    deluser:'DELETE FROM jw_user WHERE USERNAME=?;',
    queryByUser: 'SELECT * FROM jw_user WHERE USERNAME=? AND PASSWORD=?;',
    queryUserData: 'SELECT ID,USERNAME,YHBH,RULE FROM jw_user WHERE USERNAME=?;',
    queryAdmins: 'SELECT ID,USERNAME,YHBH FROM jw_user WHERE RULE=1;',
    changepswd : 'UPDATE jw_user SET PASSWORD=? WHERE USERNAME=?;',
    checkpwd : 'SELECT USERNAME FROM jw_user WHERE ID=? AND PASSWORD=?;',
    delAdmin : 'UPDATE jw_user SET RULE=0 WHERE ID=?;',
    addAdmin : 'UPDATE jw_user SET RULE=1 WHERE USERNAME=?;',
    isAdmin : 'SELECT ID,USERNAME,YHBH,RULE FROM jw_user WHERE USERNAME=?;'
};
module.exports = user;