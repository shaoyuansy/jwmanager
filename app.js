var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//路由配置开始

var index = require('./routes/index');
var users = require('./routes/users');
//教研室信息
var jys = require('./routes/jys/jiaoyanshi');





//教研室服务
var jysService = require('./routes/service/jysService');
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


//路由地址配置开始

app.use('/', index);
app.use('/users', users);
app.use('/jys',jys);

//服务路由地址配置
app.use('/jysService',jysService);
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
