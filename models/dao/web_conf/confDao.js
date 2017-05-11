// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./confSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//更新初始密码
exports.updatepswd = function (req, res, npswd, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.update, npswd, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
