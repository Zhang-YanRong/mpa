const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const plugins =require('./configs/plugins')
const entry = require('./configs/entry')
const splitChunks = require('./configs/splitChunks')
const minimizer = require('./configs/minimizer')
const modules = require('./configs/module')
const devServer = require('./webpack.dev')
const {appPath} =  require("./.env");
const config = {
  entry,
  output: {
    filename: "js/[name].[hash:8].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: '/dist/'
  },
  devServer,
  resolve: {
    extensions: [".js", ".css", ".less", ".json", ".ejs"],
    alias: {
      "@": appPath,
    }
  },
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : false,
  // watch:true,
  // watchOptions:{
  //   ignored: /node_modules/,
  //   aggregateTimeout:500,
  //   poll: 1000
  // },
  // plugins,
    plugins,
  optimization:{
    splitChunks: splitChunks,
    minimizer,
    runtimeChunk: 'single' // single 将runtime打包成一个文件；ture 打包成多个文件
  },
  module: modules,
  externals: {
    jquery: "jQuery"
  },
}
webpack(config, (err, stats) => {
  console.log('启用webpack!')
  console.log(process.env.NODE_ENV )
})
module.exports = config;