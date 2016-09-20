/**
 * Created by peng on 2016/9/20.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./jysSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

/* 获取数据列表信息*/
exports.queryAll = function (req, res, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取数据列表信息 BY ID*/
exports.queryListById = function (req, res, id, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryOne, [id], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*新增记录*/
exports.insert = function (req, res, arrayPar, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.insert, arrayPar, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*更新记录*/
exports.update = function (req, res, arrayPar, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.update, arrayPar, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
//删除记录
exports.delete = function (req, res, CO_ID, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.delete, [CO_ID], function () {
            connection.release();
            fn(1);
        });
    });
};