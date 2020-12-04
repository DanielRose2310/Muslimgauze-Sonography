var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const mongodb = require('./dbs_connected/mongodb')
const tracksR = require('./routes/tracks');
const albumsR = require('./routes/albums');
const usersR = require('./routes/users');
const admintrackR = require('./routes/admintrack');
const adminalbumR = require('./routes/adminalbum');
const adminR = require('./routes/admin');
const app = express();
const cors = require('cors')

app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'jade');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
      return res.end();
  }
  next();
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tracks', tracksR);
app.use('/users',usersR);
app.use('/albums',albumsR);
app.use('/admin',adminR);


app.use('/addtrack',admintrackR);
app.use('/addalbum',adminalbumR);
app.use(express.static(path.join(process.cwd(), 'public')));


app.use(function(req, res, next) {
  next(createError(404));
});




app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
