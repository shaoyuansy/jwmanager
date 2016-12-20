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

/* 获取数据列表信息 BY 教师姓名*/
exports.queryByMc = function (req, res, xm, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryByMc, xm, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 查询此教师姓名是否重复*/
exports.queryTeacher = function (req, res, tname, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryTeacher, tname, function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 查询此教师是不是专任教师*/
exports.queryZRteacher = function (req, res, tname, fn) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryZRteacher, tname, function (err, result) {
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

//导入时批量插入教师
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

/* 获取专业技术职称数据列表信息 BY 教研室名称*/
exports.queryByJys = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT DISTINCT t.ZYJSZC AS \'专业技术职称\',COUNT(t.ZYJSZC) AS \'人数\' FROM jw_teacher AS t LEFT JOIN jw_jys AS j ON j.JYSMC=t.JYSMC WHERE j.JYSMC like \''+JYSMC+'\' group by t.ZYJSZC', function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师性别数据列表信息 BY 教研室名称*/
exports.queryByJysForGender = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT DISTINCT t.XB AS \'性别\',COUNT(t.XB) AS \'人数\' FROM jw_teacher AS t LEFT JOIN jw_jys AS j ON j.JYSMC=t.JYSMC WHERE j.JYSMC like \''+JYSMC+'\' group by t.XB', function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师出生年月数据列表信息 BY 教研室名称*/
exports.queryByJysForCsny = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT DISTINCT t.CSNY AS \'出生年月\',COUNT(t.CSNY) AS \'人数\' FROM jw_teacher AS t LEFT JOIN jw_jys AS j ON j.JYSMC=t.JYSMC WHERE j.JYSMC like \''+JYSMC+'\' group by t.CSNY', function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师最高学位数据列表信息 BY 教研室名称*/
exports.queryByJysForZgxw = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT DISTINCT t.ZGXW AS \'学位\',COUNT(t.ZGXW) AS \'人数\' FROM jw_teacher AS t LEFT JOIN jw_jys AS j ON j.JYSMC=t.JYSMC WHERE j.JYSMC like \''+JYSMC+'\' group by t.ZGXW', function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师导师类型数据列表信息 BY 教研室名称*/
exports.queryByJysForDslx = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT DISTINCT t.DSLX AS \'导师类型\',COUNT(t.DSLX) AS \'人数\' FROM jw_teacher AS t LEFT JOIN jw_jys AS j ON j.JYSMC=t.JYSMC WHERE j.JYSMC like \''+JYSMC+'\' group by t.DSLX', function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师地区数据列表信息 BY 教研室名称*/
exports.queryByJysForDq = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT DISTINCT t.DQ AS \'地区\',COUNT(t.DQ) AS \'人数\' FROM jw_teacher AS t LEFT JOIN jw_jys AS j ON j.JYSMC=t.JYSMC WHERE j.JYSMC like \''+JYSMC+'\' group by t.DQ', function (err, result) {
            connection.release();
            fn(result);
        });
    });
};

/* 获取教师教学效果数据列表信息 BY 教研室名称*/
exports.queryByJysForJxxg = function (req, res, JYSMC, fn) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT DISTINCT t.JXXG AS \'教学效果\',COUNT(t.JXXG) AS \'人数\' FROM jw_teacher AS t LEFT JOIN jw_jys AS j ON j.JYSMC=t.JYSMC WHERE j.JYSMC like \''+JYSMC+'\' group by t.JXXG', function (err, result) {
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