var express = require('express');
var path 	= require('path');
var config 	= require('../webpack.config.js')
// routes
var routesIndex = require('../routes/index');
var routesAPI = require('../routes/api');
// webpack and auto rebuild
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
// let us get the data from a post
var bodyParser = require('body-parser');

var app = express();

// app.uses are middle wares.
// app.use(webpack in dev mode)
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.use(express.static('./dist'));

app.use('/', routesIndex);
app.use('/api', routesAPI);



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