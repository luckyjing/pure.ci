const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const pkg = require('./package.json');
const devServerPort = require('./package.json').port.dev;
const del = require('del');
const glob = require('glob');

// 当前环境
const debug = process.env.NODE_ENV == 'development';

// 删除build目录
del(['./build/*']);




// 获得项目入口文件
function getEntry(debug) {
  let files = glob.sync('./src/scripts/*.js');
  let fileEnteries = {};
  files.forEach(file => {
    let entry = path.basename(file, '.js');
    fileEnteries[entry] = [file];
    if (debug) {
      fileEnteries[entry].unshift("webpack/hot/dev-server", "webpack-hot-middleware/client?reload=true");
    }
  });
  return fileEnteries;
}
function getEntryArray() {
  let files = glob.sync('./src/scripts/*.js').map(file => path.basename(file, '.js'));
  return files;
}
// webpack插件列表
const HtmlwebpackPlugin = require('html-webpack-plugin'); // 生成一个html 加载 打包好后的脚本
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


// 资源路径列表
const entryPath = process.cwd();
const sourceEntry = path.resolve(entryPath, 'src/scripts/index.js'); // 项目入口文件
const buildDir = path.resolve(entryPath, 'build');// 打包目标地址

// 获取主题
let theme = {};
if (pkg.theme && typeof (pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = path.resolve(entryPath, cfgPath);
  }
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof (pkg.theme) === 'object') {
  theme = pkg.theme;
}

// 开发配置
const devBuildDir = path.resolve(entryPath, '__build'); // 开发环境下 静态资源目录
const entries = Object.assign({}, getEntry(debug));
let chunks = Object.keys(entries);
let config = {
  entry: entries,
  output: {
    path: debug ? devBuildDir : buildDir,
    filename: '[name]/index.js',
    publicPath: '/'
  },
  // Don't follow/bundle these modules, but request them at runtime from the environment
  externals: {
    "react": "React",
    "redux": "Redux",
    "react-dom": "ReactDOM"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }, {
        test: /\.ejs$/,
        use: [{
          loader: 'ejs-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    hot: true,
    inline: true,
    progress: false,
    color: true,
    noInfo: true,
    contentBase: devBuildDir,
    port: devServerPort
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      filename: '[name].js',
      // 提取使用3次以上的模块，将其打包到vendor里
      minChunks: 3
    })
  ],
  devtool: debug ? 'source-map' : false
};


if (debug) {
  // 开发环境
  var cssLoader = {
    test: /\.css$/,
    use: [
      'style-loader', 'css-loader'
    ]
  };
  var lessLoader = {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  };
  config.module.rules.push(cssLoader);
  config.module.rules.push(lessLoader);
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
} else {
  // 发布环境
  var cssLoader = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader']
    })
  };
  var lessLoader = {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader']
    })
  };
  config.module.rules.push(cssLoader);
  config.module.rules.push(lessLoader);
  // 分离出的css代码 在这里被注入到 css/[name].css文件里
  // @see https://github.com/webpack/extract-text-webpack-plugin
  config.plugins.push(new ExtractTextPlugin({
    filename: '[name]/index.css',
    allChunks: false
  }));
  // 压缩
  config.plugins.push(new UglifyJsPlugin({
    minimize: true
  }));
}
// 为每一个入口文件生成HTML
chunks.forEach(entry => {
  if (entry == 'vendor') {
    return;
  }
  let cfg = {
    title: entry,
    template: path.resolve(entryPath, 'src/index.ejs'),
    filename: `${entry}/index.html`,
    inject: 'body',
    hash: false,
    chunks: ['vendor', entry]
  }
  config.plugins.push(new HtmlwebpackPlugin(cfg));
});
module.exports = config;