const path = require('path');

const devServer = {
  contentBase: path.resolve(__dirname, 'dist'), // 服务的内容目录
  port: 8990, // 搭建在本地的服务的端口号
  compress: true, // 服务开启gzip压缩
  open: true,
  publicPath: '/dist/',
  host: "127.0.0.1",
  hot: true,
  hotOnly: true,
  liveReload: true,
  overlay: true,
  // proxy: {
  //     '/api': {
  //         target: 'http://localhost:3000',
  //     }, 
  //     '/': {
  //       bypass: function(req, res, proxyOptions) {
  //         const path = req.url
  //         if(path === '/'){
  //           return  '/pages/entry1.html';
  //         }else{
  //           return path;
  //         }
  //       }
  //     }
  // }
}

module.exports = devServer