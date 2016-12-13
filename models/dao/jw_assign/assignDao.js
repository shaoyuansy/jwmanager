/**
 * Created by sy on 2016/12/12.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./assignSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

/* 获取教师授课数据列表信息*/
exports.queryAll = function (req, res, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取此门课此教师可以交哪些年级*/
exports.queryStr = function (req, res, KCMC,XM, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryStr, [KCMC,XM], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取此门课此教师可以交哪些年级->递进查询*/
exports.queryStrnjbj = function (req, res, KCMC,XM,SSZY, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryStrnjbj, [KCMC,XM,SSZY], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};