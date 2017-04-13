var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


var db = require('./mydb');
var mongoose = require('mongoose');
var api = require('./routes/api');
var auth = require('./routes/auth');
var User = require('./models/user');

var app = express();

//mongoose connection
mongoose.connect(db.url());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
//0app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());


// app.post('/authenticate', function(req,res){
//    User.findOne({email: req.body.email, password: req.body.password}, function(err, user){
//       if(err){
//           res.json({
//               type: false,
//               data: "Error occurred " + err
//           });
//       } else{
//           if(user){
//               res.json({
//                   type: true,
//                   data: user.email,
//                   token: user.token
//               });
//           } else{
//               res.json({
//                   type: false,
//                   data: "Incorrect email/password"
//               });
//           }
//       }
//    });
// });
//
//
// app.post('/signin', function(req, res) {
//     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                 res.json({
//                     type: false,
//                     data: "User already exists!"
//                 });
//             } else {
//                 var userModel = new User();
//                 userModel.email = req.body.email;
//                 userModel.password = req.body.password;
//                 userModel.save(function(err, user) {
//                     console.log(user);
//                     user.token = jwt.sign(user,"rajat");
//                     user.save(function(err, user1) {
//                         res.json({
//                             type: true,
//                             data: user1.email,
//                             token: user1.token
//                         });
//                     });
//                 })
//             }
//         }
//     });
// });
//
// app.get('/me', ensureAuthorized, function(req, res) {
//     User.findOne({token: req.token}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occurred: " + err
//             });
//         } else {
//             res.json({
//                 type: true,
//                 data: user
//             });
//         }
//     });
// });
//
// function ensureAuthorized(req, res, next) {
//     var bearerToken;
//     var bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         var bearer = bearerHeader.split(" ");
//         bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.send(403);
//     }
// }

//all routes can be accessed with prefix /api/..
app.use('/api',api);
app.use('/user', auth);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
