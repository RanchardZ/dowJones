var express = require('express');
var path 	= require('path');
var config 	= require('../webpack.config.js')
var routes = require('../routes/index');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');


var app = express();

// sqlite
// var sqlite3 = require('sqlite3').verbose();
// var db 		= new sqlite3.Database('dowjones');

// db.serialize(function()) {}

// app.uses are middle wares.
// app.use(webpack in dev mode)
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.use('/', routes);


var port = 5010;

app.listen(port, function(error) {
	if (error) throw error;
	console.log("Express server listening on port", port);
});
















// // catch 404
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }