var connect = require('connect');
var http = require('http');
var webpack = require('webpack');
var config = require('../webpack.config');
var port = config.devServer.port;
config.entry.unshift(`webpack-dev-server/client?http://localhost:${port}/`,"webpack/hot/dev-server");

var app = connect();
var compiler = webpack(config);
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
    res.setHeader("Access-Control-Allow-Credentials","true");
    next();
})
app.use(require("webpack-dev-middleware")(compiler, config.devServer));
app.use(require("webpack-hot-middleware")(compiler));
app.listen(config.devServer.port, function () {
  console.log(`webpack-dev-server started in port ${port}`);
});
