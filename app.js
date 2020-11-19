var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors_proxy = require('cors-anywhere');

const mongodb = require('./dbs_connected/mongodb')
const tracksR = require('./routes/tracks');
const albumsR = require('./routes/albums');
const usersR = require('./routes/users');
const app = express();
const cors = require('cors')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tracks', tracksR);
app.use('/users',usersR);
app.use('/albums',albumsR);
app.use(function(req, res, next) {
  next(createError(404));
});
cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
