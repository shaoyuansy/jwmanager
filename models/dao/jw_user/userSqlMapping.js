/**
 * Created by sy on 2016/9/20.
 */
// CRUD SQL语句
var user = {
    queryByUser: 'SELECT * FROM jw_user WHERE USERNAME=? AND PASSWORD=?;'
};
module.exports = user;