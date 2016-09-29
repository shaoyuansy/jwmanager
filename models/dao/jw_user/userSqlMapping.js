/**
 * Created by sy on 2016/9/20.
 */

var user = {
    queryByUser: 'SELECT * FROM jw_user WHERE USERNAME=? AND PASSWORD=?;',
    queryUserData: 'SELECT * FROM jw_user WHERE USERNAME=?;'
};
module.exports = user;