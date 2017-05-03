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
exports.queryAll = function (req, res, term, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, term, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*根据id获取此条选课信息*/
exports.queryById = function (req, res, id, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.querybyid, [id], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取教师授课姓名*/
exports.queryJS = function (req, res, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryJS, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取此门课此教师可以交哪些科目*/
exports.querykcStr = function (req, res, JSXM, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.querykcStr, [JSXM], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取此门课负责人*/
exports.queryfzrStr = function (req, res, KCMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryfzrStr, [KCMC], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取此门课此教师可以交哪些专业*/
exports.queryzyStr = function (req, res, JSXM, KCMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryzyStr, [JSXM, KCMC], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取此门课此教师可以交哪些年级*/
exports.querynjStr = function (req, res, JSXM, KCMC, ZYMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.querynjStr, [JSXM, KCMC, ZYMC], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取此门课此教师可以交哪些年级的班级个数*/
exports.querybjStr = function (req, res, JSXM, KCMC, ZYMC, SSNJ, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.querybjStr, [JSXM, KCMC, ZYMC, SSNJ], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取计算机文化选课个数为总头数*/
exports.queryZTS = function (req, res, SSNJ, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryZTS, SSNJ, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 获取计算机文化选课个数为总头数*/
exports.queryassignMsg = function (req, res, SSNJ, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryassignMsg, SSNJ, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
//导入时批量插入授课信息
exports.insertSome = function (req, res, sqlStr, fn) {
    pool.getConnection(function (err, connection) {
        connection.query(sqlStr, function (err, result) {
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
        var sql = "DELETE FROM jw_assign WHERE ID IN (" + idstr + ");";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};