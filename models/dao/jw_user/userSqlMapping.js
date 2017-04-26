var user = {
    queryByUser: 'SELECT * FROM jw_user WHERE USERNAME=? AND PASSWORD=?;',
    queryUserData: 'SELECT ID,USERNAME,YHBH FROM jw_user WHERE USERNAME=?;'
};
module.exports = user;