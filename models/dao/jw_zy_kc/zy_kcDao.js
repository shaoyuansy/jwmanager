/**
 * Created by sy on 2016/9/27.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./zy_kcSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

/* 获取数据列表信息*/
exports.queryAll = function (req, res, sqlStr, fn) {
    var arr = sqlStr.split(",");
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, arr, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 只获取专业课程关联表*/
exports.queryMC = function (req, res, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryMC, function (err, result) {
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
        var sql = "DELETE FROM jw_zy_kc WHERE ID IN (" + req.query.idstr + ")";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(1);
        });
    });
};
//批量删除记录 BY 专业ID
exports.deleteSomeByZy = function (req, res, idstr, fn) {
    pool.getConnection(function (err, connection) {
        var sql = "DELETE FROM jw_zy_kc WHERE ZYID IN (" + req.query.idstr + ")";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(1);
        });
    });
};
//批量删除记录 BY 课程ID
exports.deleteSomeByKc = function (req, res, idstr, fn) {
    pool.getConnection(function (err, connection) {
        var sql = "DELETE FROM jw_zy_kc WHERE KCID IN (" + req.query.idstr + ")";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(1);
        });
    });
};