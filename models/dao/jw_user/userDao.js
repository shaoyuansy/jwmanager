/**
 * Created by sy on 2016/9/20.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

exports.queryByUser = function (req, res, userName, passWord, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryByUser, [userName, passWord], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

exports.GetUserData = function (req, res, userName, fn){
    pool.getConnection(function(err, connection) {
        connection.query($sql.queryUserData,userName,function(err, result) {
            connection.release();
            fn(result);
        });
    });
};