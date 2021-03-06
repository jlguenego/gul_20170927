var express = require('express');
var serveIndex = require('serve-index');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

var app = express();

webpackConfig.output.path = '/';
const compiler = webpack(webpackConfig);
app.use('/app/wpk/', webpackDevMiddleware(compiler, {}));

app.all('/ws/date', function (req, res, next) {
	console.log('date', req.url);
	setTimeout(function () {
		res.json({ date: new Date().getTime() });
	}, 2000);
});

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.use('/app/', function (req, res, next) {
	res.sendFile('./app/index.html', { root: '.' });
});

app.use(function (req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

var port = 8000;
app.listen(port, function () {
	console.log('server started on port ' + port);
});
