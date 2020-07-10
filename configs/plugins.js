const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack'); //访问内置的插件

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin") ;
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包时候显示进程
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独打包css
const copyWebpackPlugin = require("copy-webpack-plugin"); //静态资源输出
const purifyCssWebpack = require("purifycss-webpack"); //消除冗余的css
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ["html", "js", "css", "svg"];
const entry = require('./entry')
const {
  appPath,
  isProduction,
} =  require("../.env");

const plugins = [
  new CleanWebpackPlugin({cleanStaleWebpackAssets: false,}),

  new copyWebpackPlugin({
    patterns: [{
      from: path.resolve(__dirname, '../src/static'),
      to: path.resolve(__dirname, '../dist/static'),
    }]
  }),

  new purifyCssWebpack({
    paths: glob.sync(path.join(__dirname, "../src/pages/*/*.html"))
  }),

  new ProgressBarPlugin(),

  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash:8].css',
    chunkFilename: 'css/[id].[hash:8].css'
  }),
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
    // 只处理大于xx字节 的文件，默认：0
    threshold: 900,
    // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
    minRatio: 0.8, // 默认: 0.8
    // 是否删除源文件，默认: false
    deleteOriginalAssets: false
  })
].filter(Boolean);

function getHtmlWebpackPluginConfigs () {
  const res = [];
  for (let [entryName] of Object.entries(entry)) {
    const htmlFilePath = `${appPath}/pages/${entryName}/index.html`;
    if (!fs.existsSync(htmlFilePath)) {
      throw new Error(`file: ${htmlFilePath} not exist`);
    }
    const plugin = new HtmlWebpackPlugin({
      template: htmlFilePath,
      filename: `pages/${entryName}.html`,
      hash: true,
      chunks: ["vendor", "common", entryName],
      minify: false
      // : {
      //   removeComments: true, //移除HTML中的注释
      //   collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      //   removeAttributeQuotes: true, //去除属性引用
      // },
    });
    res.push(plugin);
  }
  return res;
}
module.exports = [...plugins, ...getHtmlWebpackPluginConfigs()];