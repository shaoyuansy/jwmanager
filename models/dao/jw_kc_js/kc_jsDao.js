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
exports.getYN = function (req, res, kcid, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryYN, kcid, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取外聘授课老师选课头数信息*/
exports.getWP = function (req, res, kcid, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryWP, kcid, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师选课信息*/
exports.getXk = function (req, res, kcid, czr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryXk, [kcid, czr], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 判断是否存在此选课信息*/
exports.exztXk = function (req, res, jsid, kcid, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.exztXk, [jsid, kcid], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 删除一条教师选课信息*/
exports.deleteXk = function (req, res, kcid, jsid, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.deleteXk, [kcid, jsid], function (err, result) {
            connection.release();
            fn(1);
        });
    });
};

/* 删除一条课程所有信息*/
exports.deleteKc = function (req, res, idstr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.deleteKc, idstr, function (err, result) {
            connection.release();
            fn(1);
        });
    });
};

/*教师选择头数*/
exports.xuanzets = function (req, res, kcid, jsid, xzts, bz, czr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.insert, [kcid, jsid, xzts, bz, czr], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*教师覆盖选择头数*/
exports.xuanzetschg = function (req, res, kcid, jsid, xzts, bz, czr, jskcid, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.insertChg, [kcid, jsid, xzts, bz, czr, jskcid], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*教师选修改头数*/
exports.xiugaits = function (req, res, xztsxg, bzxg, kcidxg, jsidxg, czr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.update, [xztsxg, bzxg, kcidxg, jsidxg, czr], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};