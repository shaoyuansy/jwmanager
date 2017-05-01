var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../until/util');
var $sql = require('./zy_kcSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

/* 获取数据列表信息*/
exports.queryAll = function (req, res, xn, zy, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, [xn,zy], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/* 只获取专业课程关联表*/
exports.queryMC = function (req, res, arr, fn) {
    var arr = arr.split("#");    
    pool.getConnection(function (err, connection) {
        if(err!=""){
            var sql = "SELECT ID, ZYID,KCID,KSXQ FROM jw_zy_kc " +
                "WHERE KSXQ = '"+ arr[1]+"' AND ZYID IN ("+ arr[0] +") " +
                "OR KSXQ = '"+ arr[3]+"' AND ZYID IN ("+ arr[2] +") " +
                "OR KSXQ = '"+ arr[5]+"' AND ZYID IN ("+ arr[4] +") " +
                "OR KSXQ = '"+ arr[7]+"' AND ZYID IN ("+ arr[6] +");"
        };
        connection.query(sql, function (err, result) {
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
// 导入多个添加记录
exports.insertSome = function (req, res, insertStr, fn) {
    pool.getConnection(function (err, connection) {
        var sql = 'INSERT INTO jw_zy_kc (ZYID,KCID,KSXQ) VALUES ' + insertStr;
        connection.query(sql, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*查询时候有重复记录*/
exports.queryRepeat = function (req, res, zyid, kcid, term, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryRepeat, [zyid, kcid, term], function (err, result) {
            connection.release();
            fn(result);
        });
    });
};
/*更新记录*/
exports.update = function (req, res, term, id, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.update, [term, id], function (err, result) {
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
        var sql = "DELETE FROM jw_zy_kc WHERE ZYID IN (" + req.body.idstr + ")";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(1);
        });
    });
};
//批量删除记录 BY 课程ID
exports.deleteSomeByKc = function (req, res, idstr, fn) {
    pool.getConnection(function (err, connection) {
        var sql = "DELETE FROM jw_zy_kc WHERE KCID IN (" + req.body.idstr + ")";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(1);
        });
    });
};
//根据专业id，所选课程ID，学期 判断是否重复添加
exports.queryCourseByids = function (req, res, ids, zyid, xq, fn) {
    pool.getConnection(function (err, connection) {
        var sql = "SELECT k.*,zk.* FROM jw_zy_kc as zk,jw_kc as k WHERE zk.KCID = k.ID AND zk.ZYID = "+ zyid +" AND zk.KSXQ = '"+ xq +"' AND zk.KCID IN ("+ ids +");";
        connection.query(sql, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};