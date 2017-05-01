/**
 * Created by sy on 2016/12/12.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./graprojectSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

/* 获取教师授课数据列表信息*/
exports.queryAll = function (req, res, term, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll,term, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*新增记录*/
exports.insertGra = function (req, res, ZYID, JSID, RS, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.insert, [ZYID,JSID,RS], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*更新记录*/
exports.updateGra = function (req, res, ZYID, JSID, RS, ID, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.update, [ZYID,JSID,RS,ID], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
//是否存在记录
exports.exGra = function (req, res, ZYID, JSID, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.exGra, [ZYID,JSID], function (err, result) {
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
        var sql = "DELETE FROM jw_graproject WHERE ID IN (" + idstr + ");";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};