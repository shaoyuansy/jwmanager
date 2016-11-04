/**
 * Created by sy on 2016/11/1.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./kc_jsSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

/* 获取院内授课老师选课头数信息*/
exports.getYN = function (req, res,kcid,fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryYN,kcid,function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取外聘授课老师选课头数信息*/
exports.getWP = function (req, res,kcid,fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryWP,kcid,function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师选课信息*/
exports.getXk = function (req, res,kcid,czr,fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryXk,[kcid,czr],function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 删除一条教师选课信息*/
exports.deleteXk = function (req, res,kcid,jsid,fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.deleteXk,[kcid,jsid],function (err, result) {
            connection.release();
            fn(1);
        });
    });
};

/*教师选择头数*/
exports.xuanzets = function (req, res, kcid,jsid,xzts,bz,czr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.insert,[kcid,jsid,xzts,bz,czr], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*教师选修改头数*/
exports.xiugaits = function (req, res, xztsxg,bzxg,kcidxg,jsidxg,czr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.update,[xztsxg,bzxg,kcidxg,jsidxg,czr], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};