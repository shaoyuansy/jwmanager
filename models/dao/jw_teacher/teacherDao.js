/**
 * Created by sy on 2016/9/21.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./teacherSqlMapping');

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
exports.queryById = function (req, res, id, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryById, [id], function (err, result) {
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

exports.insertSome = function (req, res, arrayPar, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.insertSome, arrayPar, function (err, result) {
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
        var sql = "DELETE FROM jw_teacher WHERE ID IN ("+req.query.idstr+");";
        connection.query("DELETE FROM jw_teacher WHERE ID IN ("+req.query.idstr+");", function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取数据列表信息 BY 教研室名称*/
exports.queryByJys = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryByJys, [JYSMC], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取导出的教师信息 BY Some ID*/
exports.exportBySomeId = function (req, res, idstr, fn) {
    pool.getConnection(function (err, connection) {
        var sql = "SELECT * FROM jw_teacher WHERE ID IN ("+req.query.idstr+")";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};