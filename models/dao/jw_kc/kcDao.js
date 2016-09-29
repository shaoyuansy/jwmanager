/**
 * Created by peng on 2016/9/26.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./kcSqlMapping');

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
exports.delete = function (req, res, ID, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.delete, [ID], function () {
            connection.release();
            fn(1);
        });
    });
};
//批量删除记录
exports.deleteSome = function (req, res, idstr, fn) {
    pool.getConnection(function (err, connection) {
        var sql = "DELETE FROM jw_kc WHERE ID IN ("+req.query.idstr+")";
        connection.query("DELETE FROM jw_kc WHERE ID IN ("+req.query.idstr+")", function (err, result) {
            connection.release();
            fn(1);
        });
    });
};
/* 获取数据列表信息*/
exports.querySome = function (req, res, idstr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM jw_kc WHERE ID NOT IN ("+idstr+") ORDER BY ID ASC", function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*新增记录*/
exports.insertSome = function (req, res, arrayPar, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.insertSome, arrayPar, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 由课程名称获取课程ID*/
exports.queryKcId = function (req, res,sqlStr, fn) {
    console.log("kcDao "+sqlStr);
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryKcId,[sqlStr], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};