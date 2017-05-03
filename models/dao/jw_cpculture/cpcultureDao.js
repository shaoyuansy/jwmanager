// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./cpcultureSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

/* 获取教师计算机文化授课数据列表信息*/
exports.queryAll = function (req, res, nj, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, nj, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

exports.queryexistCulture = function (req, res, ZJMC,KS,ZKT,SJ,SSNJ,SSZY,SSBJ,SKSJ,SKDD, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.existCulture, [ZJMC,KS,ZKT,SJ,SSNJ,SSZY,SSBJ,SKSJ,SKDD], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
exports.queryassignCulture = function (req, res, ZJMC,KS,ZKT,SJ,SSNJ,SSZY,SSBJ,SKSJ,SKDD,SKJS, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.assignCulture, [ZJMC,KS,ZKT,SJ,SSNJ,SSZY,SSBJ,SKSJ,SKDD,SKJS], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
