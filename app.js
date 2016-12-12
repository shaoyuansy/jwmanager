var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
//路由配置开始

//登录
var login = require('./routes/user/login');
//首页
var index = require('./routes/index');
//教师信息
var teacher = require('./routes/teacher/teacher');
//教研室信息
var jys = require('./routes/jys/jiaoyanshi');
//信息统计
var chart = require('./routes/chart/chart');
//专业信息
var major = require('./routes/major/major');
//课程信息
var course = require('./routes/course/course');
//教师选课信息管理
var selectcourse = require('./routes/selectcourse/selectcourse');
//课程分配
var assigncourse = require('./routes/assign_course/assigncourse');
//插件(上传)
var uploadFile = require('./routes/tools/uploadFile');

//专业-课程信息
var major_course = require('./routes/major_course/major_course');

//服务类Service路由
//教师服务
var teacherService = require('./routes/service/teacherService');
//教研室服务
var jysService = require('./routes/service/jysService');
//专业服务
var majorService = require('./routes/service/majorService');
//课程服务
var courseService = require('./routes/service/courseService');
//专业-课程服务
var major_courseService = require('./routes/service/major_courseService');
//教师-课程服务
var teacher_courseService = require('./routes/service/teacher_courseService');
//用户服务
var userService = require('./routes/service/userService');
//授课管理服务
var assignService = require('./routes/service/assignService');
//路由配置结束

var app = express();

//监听端口
app.listen(3000);

// 母版页类型设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//母版页设置
app.engine('ejs', require('ejs-mate'));
app.locals._layoutFile = 'master.ejs';
app.locals.title = '教师信息管理系统';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置session
app.use(cookieSession({
    name: 'session',
    keys: ['123', '321']
}));

//登陆拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != '/login' && req.session.userInfo == undefined) {
        return res.redirect('/login');
    }
    next();
});

//路由地址配置
app.use('/', index);
app.use('/index', index);
app.use('/login', login);
app.use('/teacher', teacher);
app.use('/jys',jys);
app.use('/chart',chart);
app.use('/major',major);
app.use('/course',course);
app.use('/selectcourse',selectcourse);
app.use('/tools/uploadFile', uploadFile);
app.use('/major_course',major_course);
app.use('/assigncourse',assigncourse);

//服务路由地址配置
app.use('/jysService',jysService);
app.use('/teacherService',teacherService);
app.use('/majorService',majorService);
app.use('/courseService',courseService);
app.use('/major_courseService',major_courseService);
app.use('/teacher_courseService',teacher_courseService);
app.use('/userService',userService);
app.use('/assignService',assignService);
//路由地址配置结束

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
